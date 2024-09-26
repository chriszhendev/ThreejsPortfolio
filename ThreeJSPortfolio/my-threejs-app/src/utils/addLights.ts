import * as THREE from "three";

export function addLights(scene: THREE.Scene): void {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  // directionalLight1.position.set(0, 1, 1);
  directionalLight1.position.set(0, 1, 0);
  directionalLight2.position.set(1, 1, 0);
  directionalLight3.position.set(0, 1, 1);
  scene.add(directionalLight1, directionalLight2, directionalLight3);
}
