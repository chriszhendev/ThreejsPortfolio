// src/components/MyThreeScene.tsx

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
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

    // Create scene, camera, and renderer
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();

    // Append renderer to DOM
    currentMount?.appendChild(renderer.domElement);

    // Add lights to the scene
    addLights(scene);

    // Load the model
    loadModel(scene);

    // Optional: Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Start animation loop
    animationLoop(renderer, scene, camera, controls);

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      currentMount?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);

      // Dispose of renderer
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
