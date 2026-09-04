import {
  LEVEL_LOW_THRESHOLD,
  LEVEL_STACK,
  LEVEL_STACK_LOW,
} from "@akasha/temper-combat-addon/combat-action-levels"
import type { Action, Effect } from "@akasha/temper-combat-addon/combat-action-types"

const STACK_BEGINNING_WINDOW_MS = 1000

const SUDDEN_STACK_THRESHOLD = 3

export function updateStackInfo(
  action: Action,
  effect: Effect,
  opts: { now: number; descriptionNums: number[] }
): undefined {
  const stackCount = effect.stackCount
  const sameAbilityAs = (slot: Effect | undefined): boolean =>
    slot !== undefined && slot.ability.id === effect.ability.id

  const matchesDescription = opts.descriptionNums.includes(stackCount)

  let addType = 0
  if (action.stackEffect === undefined) {
    addType = 1
    if (
      stackCount >= SUDDEN_STACK_THRESHOLD &&
      opts.now - action.startTime < STACK_BEGINNING_WINDOW_MS &&
      !action.fake &&
      matchesDescription
    ) {
      addType = 2
      if (
        action.stackEffect2 !== undefined &&
        action.stackEffect2.ability.id !== effect.ability.id
      ) {
        addType = 0
      }
    }
  } else if (action.stackEffect.ability.id === effect.ability.id) {
    addType = 1
  } else if (action.stackEffect2 === undefined || sameAbilityAs(action.stackEffect2)) {
    addType = 2
  }

  if (addType === 1) {
    action.stackEffect = effect
    action.stackCount = stackCount
  } else if (addType === 2) {
    action.stackEffect2 = effect
  }

  if (addType > 0) {
    effect.level = addType === 1 ? LEVEL_STACK : LEVEL_STACK_LOW
    effect.levelIsLow = effect.level > LEVEL_LOW_THRESHOLD
  }

  return undefined
}
