import * as THREE from "three";
import { OrbitControls } from "three-stdlib";

export function animationLoop(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  controls?: OrbitControls
): void {
  const animate = () => {
    requestAnimationFrame(animate);

    if (controls) {
      controls.update();
    }

    renderer.render(scene, camera);
  };
  animate();
}
