import React, { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three-stdlib";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import * as THREE from "three";

import { AnimationName } from "../store/playerState";
import { createScene } from "../../utils/createScene";
import { createCamera } from "../../utils/createCamera";
import { createRenderer } from "../../utils/createRenderer";
import { addLights } from "../../utils/addLights";
import { loadModel } from "../../utils/loadModel";
import { animationLoop } from "../../utils/animationLoop";
import { playAnimation, playAnimationOnce } from "../../utils/playAnimation";
import { setCurrentAnimation, setPlayerState } from "../../store/playerState";

const MyThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<{ [name: string]: THREE.AnimationAction }>({});
  const playerState = useSelector((state: RootState) => state.player.state);
  const [currentAnimation, setCurrentAnimation] = useState<AnimationName>(
    AnimationName.Idle
  );
  const initialPlayerStateRef = useRef(playerState);
  const dispatch = useDispatch();

  // async function playFollowUpAnimation(
  //   state1: AnimationName,
  //   state2: AnimationName
  // ) {
  //   try {
  //     if (actionsRef.current && mixerRef.current) {
  //       await playAnimationOnce(state1, actionsRef.current, mixerRef.current);
  //       playAnimation(state2, actionsRef.current);
  //     }
  //   } catch (error) {
  //     console.error("Error playing animations:", error);
  //   }
  // }

  useEffect(() => {
    const currentMount = mountRef.current;

    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();

    currentMount?.appendChild(renderer.domElement);

    addLights(scene);

    loadModel(scene).then(({ mixer, actions }) => {
      mixerRef.current = mixer;
      actionsRef.current = actions;

      if (initialPlayerStateRef && actions) {
        console.log("PLAYING ANIMATION!");
        playAnimation(initialPlayerStateRef.current, actions);
      }
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    animationLoop(renderer, scene, camera, mixerRef);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      currentMount?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);

      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    console.log(playerState);
    console.log(currentAnimation);

    const runAnimations = async () => {
      if (mixerRef.current && actionsRef.current && playerState) {
        //plays the exit animation for previous state if it has one
        await playExitAnimation(currentAnimation);
        //play start animation for current state if it has one
        await playEnterAnimation(playerState);
        //play the loop animation if it has one
        playAnimationLoop(playerState);
        setCurrentAnimation();
      }
    };

    runAnimations();
  }, [playerState]); // Only playerState is in the dependency array

  return (
    <div
      ref={mountRef}
      className="w-full h-full fixed top-0 left-0 overflow-hidden"
    />
  );
};

export default MyThreeScene;
