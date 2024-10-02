import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export function loadModel(scene: THREE.Scene): void {
  // Load the environment map (ensure it's only loaded once)
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const envMap = cubeTextureLoader.load(
    [
      "textures/wall.png", // Positive X
      "textures/wall.png", // Negative X
      "textures/wall.png", // Positive Y
      "textures/wall.png", // Negative Y
      "textures/environmentMap.webp", // Positive Z
      "textures/wall.png", // Negative Z
    ],
    () => {
      console.log("Environment map loaded successfully for scene");
    },
    undefined,
    (error) => {
      console.error("Error loading environment map:", error);
    }
  );

  // Apply environment map to the scene
  scene.environment = envMap;
  scene.background = envMap;

  // Load the GLTF model
  const loader = new GLTFLoader();
  const modelPath = "models/doggo12.glb"; // Replace with your model path

  loader.load(
    modelPath,
    (gltf) => {
      console.log("GLTF Model loaded");

      // Add the model to the scene
      scene.add(gltf.scene);

      // Traverse the model and apply the environment map to materials
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;

          // Ensure the material supports envMap (MeshStandardMaterial or MeshPhysicalMaterial)
          if (material && material.isMeshStandardMaterial) {
            material.envMap = envMap;
            material.envMapIntensity = 1.4;
            material.needsUpdate = true;
            console.log("Applied environment map to mesh:", child.name);
          }
        }
      });
    },
    undefined,
    (error) => {
      console.error("Error loading GLTF model:", error);
    }
  );
}
