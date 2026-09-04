import { ensureCruxActions } from "@akasha/temper-combat-addon/combat-action-crux"
import { clearCrux, setCruxStacks } from "@akasha/temper-combat-addon/combat-action-crux-stacks"
import { buildEffect } from "@akasha/temper-combat-addon/combat-action-effect"
import {
  findActionByNewEffect,
  findActionByOldEffect,
} from "@akasha/temper-combat-addon/combat-action-effect-lookup"
import { calcLevel, sortEffectList } from "@akasha/temper-combat-addon/combat-action-priority"
import { removeAction, STATE } from "@akasha/temper-combat-addon/combat-action-queue"
import { getSelectedRole } from "@akasha/temper-combat-addon/combat-action-slots"
import { updateStackInfo } from "@akasha/temper-combat-addon/combat-action-stacks"
import { saveAction } from "@akasha/temper-combat-addon/combat-action-store"
import type { Effect } from "@akasha/temper-combat-addon/combat-action-types"

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
