import { AnimationName } from "../store/playerState";
import * as THREE from "three";

let currentAction: THREE.AnimationAction | null = null;

export function playAnimation(
  state: AnimationName,
  actions: { [name: string]: THREE.AnimationAction }
): void {
  // Fade out the current action, if any
  if (currentAction) {
    currentAction.fadeOut(0.5);
  }

  const action = actions[state];
  action.reset();
  action.fadeIn(0.5);
  action.play();
  action.clampWhenFinished = true;
  currentAction = action;
}
