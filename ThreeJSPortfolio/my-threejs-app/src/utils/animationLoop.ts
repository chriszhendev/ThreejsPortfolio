import * as THREE from "three";

export function animationLoop(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  mixerRef: React.MutableRefObject<THREE.AnimationMixer | null>,
  speedFactor: number = 0.75
): () => void {
  const clock = new THREE.Clock();
  let animationFrameId: number;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta() * speedFactor;

    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}
