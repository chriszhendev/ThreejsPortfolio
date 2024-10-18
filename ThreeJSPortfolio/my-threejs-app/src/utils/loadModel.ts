import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export interface ModelLoadResult {
  mixer: THREE.AnimationMixer;
  actions: { [name: string]: THREE.AnimationAction };
}

export function loadModel(scene: THREE.Scene): Promise<ModelLoadResult> {
  return new Promise((resolve, reject) => {
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
        reject(error);
      }
    );

    scene.environment = envMap;
    scene.background = envMap;

    const loader = new GLTFLoader();
    const modelPath = "models/doggo23.glb";

    loader.load(
      modelPath,
      (gltf) => {
        console.log("GLTF Model loaded");

        const model = gltf.scene;
        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);
        const actions: { [name: string]: THREE.AnimationAction } = {};

        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          console.log("CLIP NAME: ", clip.name);
          actions[clip.name] = action;
        });

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshStandardMaterial;

            if (material && material.isMeshStandardMaterial) {
              material.envMap = envMap;
              material.envMapIntensity = 1.4;
              material.needsUpdate = true;
            }
          }
        });

        resolve({ mixer, actions });
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model:", error);
        reject(error);
      }
    );
  });
}
