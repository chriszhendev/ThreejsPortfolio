import React, { useEffect, useRef } from "react";
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
import { setPlayerState } from "../../store/playerState";

const MyThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<{ [name: string]: THREE.AnimationAction }>({});
  const playerState = useSelector((state: RootState) => state.player.state);
  const initialPlayerStateRef = useRef(playerState);
  const dispatch = useDispatch();

  async function playFollowUpAnimation(
    state1: AnimationName,
    state2: AnimationName
  ) {
    try {
      if (actionsRef.current && mixerRef.current) {
        await playAnimationOnce(state1, actionsRef.current, mixerRef.current);
        playAnimation(state2, actionsRef.current);
      }
    } catch (error) {
      console.error("Error playing animations:", error);
    }
  }

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

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "a" || event.key === "A") {
  //       dispatch(setPlayerState("Idle"));
  //       console.log("A!");
  //     } else if (event.key === "s" || event.key === "S") {
  //       dispatch(setPlayerState("Walk"));
  //       console.log("S!");
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [dispatch]);

  useEffect(() => {
    console.log(playerState);
    if (mixerRef.current && actionsRef.current && playerState) {
      console.log("Playing animation for state:", playerState);

      switch (playerState) {
        case "Idle":
          playAnimation(playerState, actionsRef.current);
          break;
        case "Work":
          playFollowUpAnimation("Work", "Work2");
          break;
        case "About":
          playAnimation(playerState, actionsRef.current);
          break;
        case "Contact":
          playAnimation(playerState, actionsRef.current);
          break;
        case "Projects":
          playAnimation(playerState, actionsRef.current);
          break;

        default:
          break;
      }
    }
  }, [playerState]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full fixed top-0 left-0 overflow-hidden"
    />
  );
};

export default MyThreeScene;
