import * as THREE from "three";
import { OBJLoader } from "three-stdlib";

export function loadModel(
  scene: THREE.Scene,
  onLoad?: (object: THREE.Object3D) => void
): void {
  const textureLoader = new THREE.TextureLoader();
  const texturePath = "textures/Corgi_Base_color.png";
  const texture = textureLoader.load(
    texturePath,
    () => {
      console.log("Texture loaded successfully");
    },
    undefined,
    (error) => {
      console.error("Error loading texture:", error);
    }
  );
  const modelPath = "models/chris-corgi.obj";

  const objLoader = new OBJLoader();
  objLoader.load(
    modelPath,
    (object) => {
      // Adjust the scale
      object.scale.set(2, 2, 2);

      // Adjust the position
      object.position.z = -2;

      // Log the names of all meshes
      object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          console.log("Mesh name:", mesh.name);
        }
      });

      // Apply materials to specific meshes
      object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          if (mesh.name === "Base_Body_Corgi") {
            console.log("Applying texture to 'Base_Body_Corgi'");
            mesh.material = new THREE.MeshStandardMaterial({
              map: texture,
              metalness: 0.05,
              roughness: 0.4,
            });
          } else if (mesh.name === "Eye_Eye") {
            console.log("Applying black reflective material to 'Eye_Eye'");
            mesh.material = new THREE.MeshStandardMaterial({
              color: 0x666666,
              metalness: 1,
              roughness: 0,
            });
          } else if (mesh.name === "Collar_Collar") {
            console.log("Applying red material to 'Collar_Collar'");
            mesh.material = new THREE.MeshStandardMaterial({
              color: 0xff0000, // Red color
              metalness: 0.1,
              roughness: 0.1,
            });
          } else {
            // Assign default material to other meshes
            mesh.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
          }
        }
      });

      // Center the model
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      object.position.sub(center);

      scene.add(object);

      if (onLoad) {
        onLoad(object);
      }
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.error("An error occurred while loading the OBJ file", error);
    }
  );
}
