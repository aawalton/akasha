import type { CharacterCompletion } from "@temper/game-completion/completion-types"

export function mkMount(
  speed: number,
  stamina: number,
  carry: number,
  max = 60
): CharacterCompletion["mountTraining"] {
  return {
    speed,
    maxSpeed: max,
    stamina,
    maxStamina: max,
    carryCapacity: carry,
    maxCarryCapacity: max,
  }
}

export const CHAR_FULL: CharacterCompletion = {
  mountTraining: mkMount(60, 60, 60),
}

export const CHAR_PARTIAL: CharacterCompletion = {
  mountTraining: mkMount(30, 0, 0),
}

export const CHAR_EMPTY: CharacterCompletion = {
  mountTraining: mkMount(0, 0, 0),
}
