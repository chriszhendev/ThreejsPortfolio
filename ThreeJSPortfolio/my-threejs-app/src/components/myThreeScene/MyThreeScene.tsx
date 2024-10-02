// src/components/MyThreeScene.tsx

import React, { useEffect, useRef } from "react";
import { OrbitControls } from "three-stdlib";

// Import utility functions
import { createScene } from "../../utils/createScene";
import { createCamera } from "../../utils/createCamera";
import { createRenderer } from "../../utils/createRenderer";
import { addLights } from "../../utils/addLights";
import { loadModel } from "../../utils/loadModel";
import { animationLoop } from "../../utils/animationLoop";

const MyThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();

    currentMount?.appendChild(renderer.domElement);

    addLights(scene);

    loadModel(scene);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    animationLoop(renderer, scene, camera, controls);

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

  return (
    <div
      ref={mountRef}
      className="w-full h-full fixed top-0 left-0 overflow-hidden"
    />
  );
};

export default MyThreeScene;
