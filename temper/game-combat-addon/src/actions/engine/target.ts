import { buildAbility } from "../model/ability"
import { buildEffect } from "../model/effect"
import { matchesOldEffect } from "../model/matching"
import { state } from "./registries"

const CORE_MULTIPLE_TARGET_TRACKING = true
const CORE_MULTIPLE_TARGET_TRACKING_WITHOUT_CLEARING = true

function markEnemyActionsOut(ignoredEffectIds: Set<number>): undefined {
  for (const [key, action] of [...state.idActionMap.entries()]) {
    if (action.flags.onlyOneTarget) {
      for (const effect of action.effectList) {
        ignoredEffectIds.add(effect.ability.id)
      }
    } else if (action.flags.forEnemy) {
      action.targetOut = true
      if (!CORE_MULTIPLE_TARGET_TRACKING_WITHOUT_CLEARING) {
        state.idActionMap.delete(key)
      }
    }
  }
  return undefined
}

function restoreMatchedBuffs(ignoredEffectIds: Set<number>): undefined {
  const numBuffs = GetNumBuffs("reticleover")
  for (let i = 1; i <= numBuffs; i = i + 1) {
    const [
      buffName,
      timeStarted,
      _timeEnding,
      _buffSlot,
      _stackCount,
      iconFilename,
      _deprecatedBuffType,
      _effectType,
      _abilityType,
      _statusEffectType,
      abilityId,
      _canClickOff,
      castByPlayer,
    ] = GetUnitBuffInfo("reticleover", i)

    if (!castByPlayer || ignoredEffectIds.has(abilityId)) {
      continue
    }

    const startTime = Math.floor(timeStarted * 1000)
    const action = state.timeActionMap.get(startTime)
    if (action === undefined) {
      continue
    }

    const ability = buildAbility({
      id: abilityId,
      name: buffName,
      icon: iconFilename,
      description: "",
      type: 0,
    })
    const effect = buildEffect({
      ability,
      unitTag: "none",
      unitId: 0,
      startTime,
      endTime: startTime,
      stackCount: 0,
    })

    if (matchesOldEffect(action, effect)) {
      action.targetOut = false
      state.idActionMap.set(action.ability.id, action)
      if (action.flags.forEnemy && action.targetId !== undefined && action.targetId > 0) {
        state.targetId = action.targetId
      }
    }
  }
  return undefined
}

export function handleReticleTargetChanged(now: number): undefined {
  void now
  state.targetId = undefined
  if (!CORE_MULTIPLE_TARGET_TRACKING) {
    return undefined
  }
  if (!DoesUnitExist("reticleover")) {
    return undefined
  }

  const ignoredEffectIds = new Set<number>()
  markEnemyActionsOut(ignoredEffectIds)
  restoreMatchedBuffs(ignoredEffectIds)
  return undefined
}
