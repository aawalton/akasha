import { ensureCruxActions } from "../combat-action-crux/combat-action-crux.module.code.ts"
import {
  clearCrux,
  setCruxStacks,
} from "../combat-action-crux-stacks/combat-action-crux-stacks.module.code.ts"
import { buildEffect } from "../combat-action-effect/combat-action-effect.module.code.ts"
import {
  findActionByNewEffect,
  findActionByOldEffect,
} from "../combat-action-effect-lookup/combat-action-effect-lookup.module.code.ts"
import {
  calcLevel,
  sortEffectList,
} from "../combat-action-priority/combat-action-priority.module.code.ts"
import { removeAction, STATE } from "../combat-action-queue/combat-action-queue.module.code.ts"
import { getSelectedRole } from "../combat-action-slots/combat-action-slots.module.code.ts"
import { updateStackInfo } from "../combat-action-stacks/combat-action-stacks.module.code.ts"
import { saveAction } from "../combat-action-store/combat-action-store.module.code.ts"
import type { Effect } from "../combat-action-types/combat-action-types.module.code.ts"

export interface EffectChange {
  changeType: number
  abilityId: number
  abilityName: string
  iconName: string
  unitTag: string
  unitId: number
  beginTimeMs: number
  endTimeMs: number
  stackCount: number
  effectType: number
}

export function decodeEffectChange(
  changeType: number,
  effectName: string,
  unitTag: string,
  beginTimeSec: number,
  endTimeSec: number,
  stackCount: number,
  iconName: string,
  effectType: number,
  unitId: number,
  abilityId: number
): EffectChange {
  return {
    changeType,
    abilityId,
    abilityName: effectName,
    iconName,
    unitTag,
    unitId,
    beginTimeMs: Math.floor(beginTimeSec * 1000),
    endTimeMs: Math.floor(endTimeSec * 1000),
    stackCount,
    effectType,
  }
}

function effectFromChange(c: EffectChange): Effect {
  return buildEffect({
    ability: {
      id: c.abilityId,
      name: c.abilityName,
      showName: c.abilityName,
      icon: c.iconName,
      description: "",
      type: c.effectType,
    },
    unitTag: c.unitTag,
    unitId: c.unitId,
    startTime: c.beginTimeMs,
    endTime: c.endTimeMs,
    stackCount: c.stackCount,
  })
}

function handleGained(effect: Effect): undefined {
  const action = findActionByNewEffect(effect)
  if (action === undefined) {
    return undefined
  }
  action.effectList.push(effect)
  calcLevel(action, effect, getSelectedRole())
  sortEffectList(action)
  action.effectEndTimes.push(effect.endTime)
  action.lastEffectTime = effect.startTime
  saveAction(action)
  return undefined
}

function handleUpdated(effect: Effect): undefined {
  const action = findActionByOldEffect(effect)
  if (action === undefined) {
    return undefined
  }
  let replaced = false
  for (let i = 0; i < action.effectList.length; i++) {
    const existing = action.effectList[i]
    if (
      existing !== undefined &&
      existing.ability.id === effect.ability.id &&
      (existing.unitId === effect.unitId || effect.unitId === 0)
    ) {
      action.effectList[i] = effect
      replaced = true
      break
    }
  }
  if (!replaced) {
    action.effectList.push(effect)
  }
  calcLevel(action, effect, getSelectedRole())
  sortEffectList(action)
  action.effectEndTimes.push(effect.endTime)
  action.lastEffectTime = effect.startTime
  STATE.timeActionMap.set(effect.startTime, action)
  return undefined
}

function handleFaded(effect: Effect, now: number): undefined {
  const action = findActionByOldEffect(effect)
  if (action === undefined) {
    return undefined
  }
  let purgedStartTime: number | undefined
  const kept: Effect[] = []
  for (const existing of action.effectList) {
    if (
      existing.ability.id === effect.ability.id &&
      (existing.unitId === effect.unitId || effect.unitId === 0)
    ) {
      purgedStartTime = existing.startTime
    } else {
      kept.push(existing)
    }
  }
  action.effectList = kept

  if (purgedStartTime !== undefined) {
    let stillReferenced = false
    for (const existing of action.effectList) {
      if (existing.startTime === purgedStartTime) {
        stillReferenced = true
      }
    }
    if (!stillReferenced) {
      STATE.timeActionMap.delete(purgedStartTime)
    }
  }

  if (action.fake && action.effectList.length === 0 && now < action.startTime + 1100) {
    removeAction(action)
  }
  return undefined
}

function handleStack(effect: Effect, isFaded: boolean, now: number): undefined {
  if (isFaded) {
    const action = findActionByOldEffect(effect)
    if (action === undefined) {
      return undefined
    }
    const cleared = { ...effect, stackCount: 0 }
    updateStackInfo(action, cleared, { now, descriptionNums: action.descriptionNums })
    STATE.timeActionMap.delete(effect.startTime)
    return undefined
  }

  const action = findActionByNewEffect(effect)
  if (action === undefined) {
    return undefined
  }
  if (action.duration > 0) {
    effect.startTime = action.startTime
    effect.duration = action.duration
    effect.endTime = action.endTime
  }
  updateStackInfo(action, effect, { now, descriptionNums: action.descriptionNums })
  action.lastEffectTime = effect.startTime
  STATE.lastEffectAction = action
  STATE.timeActionMap.set(effect.startTime, action)
  return undefined
}

export function handleEffectChanged(c: EffectChange, now: number): undefined {
  const effect = effectFromChange(c)

  if (effect.isCrux) {
    if (c.changeType === EFFECT_RESULT_FADED) {
      clearCrux()
    } else {
      setCruxStacks(effect.stackCount, effect.startTime, effect.endTime)
    }
    ensureCruxActions(now)
    return undefined
  }

  if (c.stackCount > 0) {
    handleStack(effect, c.changeType === EFFECT_RESULT_FADED, now)
    return undefined
  }

  if (c.changeType === EFFECT_RESULT_GAINED) {
    handleGained(effect)
    return undefined
  }
  if (
    c.changeType === EFFECT_RESULT_UPDATED ||
    c.changeType === EFFECT_RESULT_FULL_REFRESH ||
    c.changeType === EFFECT_RESULT_TRANSFER
  ) {
    handleUpdated(effect)
    return undefined
  }
  if (c.changeType === EFFECT_RESULT_FADED) {
    handleFaded(effect, now)
    return undefined
  }
  return undefined
}
