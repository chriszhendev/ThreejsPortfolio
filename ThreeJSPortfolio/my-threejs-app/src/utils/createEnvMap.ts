import * as THREE from "three";

export function loadEnvMap(
  scene: THREE.Scene,
  onLoad?: (envMap: THREE.CubeTexture) => void
): void {
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  cubeTextureLoader.load(
    [
      "textures/wall.png", // Positive X
      "textures/wall.png", // Negative X
      "textures/wall.png", // Positive Y
      "textures/wall.png", // Negative Y
      "textures/environmentMap.webp", // Positive Z
      "textures/wall.png", // Negative Z
    ],
    (envMap) => {
      console.log("Environment map loaded successfully");

      // Set the environment and background maps for the scene
      scene.environment = envMap;
      scene.background = envMap;

      if (onLoad) {
        onLoad(envMap); // Optionally call onLoad with the environment map
      }
    },
    undefined,
    (error) => {
      console.error("Error loading environment map:", error);
    }
  );
}
