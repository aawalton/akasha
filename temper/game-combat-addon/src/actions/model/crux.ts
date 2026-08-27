import { buildEffect } from "./effect"
import { LEVEL_CRUX } from "./model-constants"
import type { Ability, Effect } from "./types"

interface CruxState {
  stacks: number
  startTime: number
  endTime: number
}

let state: CruxState = { stacks: 0, startTime: 0, endTime: 0 }

export function setCruxStacks(stacks: number, now: number, endTime: number): undefined {
  if (stacks <= 0) {
    state = { stacks: 0, startTime: now, endTime: 0 }
    return undefined
  }
  state = { stacks, startTime: now, endTime }
  return undefined
}

export function getCruxEffect(ability: Ability): Effect | undefined {
  if (state.stacks <= 0) {
    return undefined
  }
  const effect = buildEffect({
    ability,
    unitTag: "player",
    unitId: 0,
    startTime: state.startTime,
    endTime: state.endTime,
    stackCount: state.stacks,
  })
  effect.level = LEVEL_CRUX
  effect.levelIsLow = true
  effect.isCrux = true
  return effect
}

export function clearCrux(): undefined {
  state = { stacks: 0, startTime: 0, endTime: 0 }
  return undefined
}

export function getCruxStacks(): number {
  return state.stacks
}

export function isCruxConsumerIcon(icon: string): boolean {
  return icon.includes("arcanist_002") || icon.includes("arcanist_003_b")
}
