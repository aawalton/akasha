import { buildAbility } from "@akasha/temper-combat-addon/combat-action-ability"
import { buildEffect } from "@akasha/temper-combat-addon/combat-action-effect"
import { findActionByNewEffect } from "@akasha/temper-combat-addon/combat-action-effect-lookup"
import { removeAction, STATE } from "@akasha/temper-combat-addon/combat-action-queue"
import { getAbilityFrequencyMs } from "@akasha/temper-combat-addon/combat-action-slots"
import { saveAction } from "@akasha/temper-combat-addon/combat-action-store"
import type { Action, Effect } from "@akasha/temper-combat-addon/combat-action-types"

const CORE_MINIMUM_DURATION_MS = 2500

function purgeEffect(action: Action, effect: Effect, now: number): Effect {
  let oldEffect = effect

  if (action.tickEffect !== undefined && action.tickEffect.ability.id === effect.ability.id) {
    action.tickEffect = undefined
    return effect
  }

  for (let i = 0; i < action.effectList.length; i = i + 1) {
    const e = action.effectList[i]
    if (e === undefined) {
      continue
    }
    if (e.ability.id === effect.ability.id && e.unitId === effect.unitId) {
      action.effectList.splice(i, 1)
      oldEffect = e
      break
    }
  }

  const s1 = action.stackEffect
  if (s1 !== undefined && s1.ability.id === effect.ability.id && s1.unitId === effect.unitId) {
    oldEffect = s1
    action.stackEffect = undefined
  }
  const s2 = action.stackEffect2
  if (s2 !== undefined && s2.ability.id === effect.ability.id && s2.unitId === effect.unitId) {
    oldEffect = s2
    action.stackEffect2 = undefined
  }

  let availableEffectCount = 0
  for (const entry of action.effectList) {
    if (!entry.ignored) {
      availableEffectCount = availableEffectCount + 1
    }
  }
  const withOldFake = action.oldAction?.fake === true
  if (
    availableEffectCount === 0 &&
    oldEffect.duration > 0 &&
    (oldEffect.startTime >= action.startTime || action.fake || withOldFake)
  ) {
    action.endTime = now
  }

  return oldEffect
}

function purgeEffectByTargetUnitId(action: Action, targetUnitId: number, now: number): undefined {
  let purgedEffect: Effect | undefined
  for (const entry of [...action.effectList]) {
    if (entry.unitId === targetUnitId) {
      purgedEffect = purgeEffect(action, entry, now)
    }
  }
  if (action.flags.forEnemy && purgedEffect !== undefined) {
    const anchor = purgedEffect
    for (const entry of [...action.effectList]) {
      if (Math.abs(entry.startTime - anchor.startTime) < 100) {
        purgeEffect(action, entry, now)
      }
    }
  }
  return undefined
}

function findActionByTick(tickEffectId: number, unitId: number): Action | undefined {
  for (const action of STATE.idActionMap.values()) {
    if (
      action.tickEffect !== undefined &&
      action.tickEffect.ability.id === tickEffectId &&
      action.tickEffect.unitId === unitId
    ) {
      return action
    }
  }
  return undefined
}

function saveTickEffect(action: Action, effect: Effect): undefined {
  const rate = effect.tickRate ?? 0
  if (rate <= 0) {
    return undefined
  }
  if (action.tickEffect !== undefined && action.tickEffect.ability.id === effect.ability.id) {
    return undefined
  }
  action.tickEffect = effect
  action.lastEffectTime = effect.startTime
  return undefined
}

export interface CombatEvent {
  result: number
  abilityId: number
  abilityName: string
  iconName: string
  sourceType: number
  targetType: number
  hitValue: number
  unitId: number
}

export function handleCombatEvent(e: CombatEvent, now: number): undefined {
  const targetUnitId = e.unitId

  if (e.result === ACTION_RESULT_DIED_XP) {
    for (const action of STATE.idActionMap.values()) {
      purgeEffectByTargetUnitId(action, targetUnitId, now)
    }
  }

  if (e.result === ACTION_RESULT_EFFECT_FADED && e.abilityName.length > 0) {
    const channelAction = STATE.idActionMap.get(e.abilityId)
    if (channelAction !== undefined && channelAction.channelUnitId === targetUnitId) {
      channelAction.channelEndTime = now
      if (channelAction.effectList.length === 0) {
        channelAction.endTime = now
      }
    }

    for (const action of STATE.idActionMap.values()) {
      let effect: Effect | undefined
      if (action.stackEffect2 !== undefined && action.stackEffect2.combatEventId === e.abilityId) {
        effect = action.stackEffect2
      } else if (
        action.stackEffect !== undefined &&
        action.stackEffect.combatEventId === e.abilityId
      ) {
        effect = action.stackEffect
      }
      if (effect !== undefined) {
        const oldEffect = purgeEffect(action, effect, now)
        STATE.timeActionMap.delete(oldEffect.startTime)
      }
    }

    const tickAction = findActionByTick(e.abilityId, targetUnitId)
    if (tickAction !== undefined && tickAction.duration === 0) {
      removeAction(tickAction)
    }
  }

  return undefined
}

function abilityFromEvent(e: CombatEvent): ReturnType<typeof buildAbility> {
  return buildAbility({
    id: e.abilityId,
    name: e.abilityName,
    icon: GetAbilityIcon(e.abilityId),
    icon2: e.iconName.length > 0 ? e.iconName : undefined,
    description: "",
    type: 0,
  })
}

function handleTickGain(e: CombatEvent, now: number): boolean {
  const tickRate = getAbilityFrequencyMs(e.abilityId)
  if (tickRate <= CORE_MINIMUM_DURATION_MS) {
    return false
  }
  const ability = abilityFromEvent(e)
  const effect = buildEffect({
    ability,
    unitTag: "player",
    unitId: e.unitId,
    startTime: now,
    endTime: now,
    stackCount: 0,
    tickRate,
  })
  const action = findActionByNewEffect(effect)
  if (action !== undefined) {
    saveTickEffect(action, effect)
    saveAction(action)
    return true
  }
  return false
}

function handleEffectGainedQueue(e: CombatEvent, now: number): undefined {
  for (const action of STATE.actionQueue) {
    if (action.ability.id !== e.abilityId && action.ability.name !== e.abilityName) {
      continue
    }
    const duration = action.duration
    const isAreaWindow = action.flags.forArea && now - action.startTime < 2000
    if (
      !action.saved &&
      duration > CORE_MINIMUM_DURATION_MS &&
      (isAreaWindow || action.flags.forGround)
    ) {
      action.startTime = now
      action.endTime = now + duration
      if (action.flags.forGround) {
        action.groundFirstEffectId = -1
      }
      saveAction(action)
      return undefined
    }
    const currentStack = action.stackEffect?.stackCount ?? 0
    const incrementsStack = e.hitValue > 1 && e.hitValue === currentStack + 1
    const matchesDescription = action.descriptionNums.includes(e.hitValue)
    if (incrementsStack || matchesDescription) {
      const ability = abilityFromEvent(e)
      const effect = buildEffect({
        ability,
        unitTag: "player",
        unitId: e.unitId,
        startTime: now,
        endTime: now,
        stackCount: e.hitValue,
        combatEventId: e.abilityId,
      })
      action.stackEffect2 = effect
      action.stackCount = e.hitValue
      saveAction(action)
    }
  }
  return undefined
}

function handleEffectGainedDuration(e: CombatEvent, now: number): undefined {
  const selfSourced = e.sourceType === e.targetType

  for (const action of STATE.actionQueue) {
    if (action.ability.id !== e.abilityId && action.ability.name !== e.abilityName) {
      continue
    }
    let duration = action.duration
    if (duration === 0 && selfSourced) {
      duration = e.hitValue
    }
    if (duration <= CORE_MINIMUM_DURATION_MS) {
      continue
    }
    if ((action.flags.forArea && now - action.startTime < 2000) || action.flags.forGround) {
      action.startTime = now
      action.endTime = now + duration
      if (action.flags.forGround) {
        action.groundFirstEffectId = -1
      }
      saveAction(action)
    }
    const stackEffect2 = action.stackEffect2
    if (stackEffect2 !== undefined && stackEffect2.stackCount > 0) {
      const ability = abilityFromEvent(e)
      const effect = buildEffect({
        ability,
        unitTag: "player",
        unitId: e.unitId,
        startTime: now,
        endTime: now + duration,
        stackCount: stackEffect2.stackCount,
        combatEventId: e.abilityId,
      })
      action.stackEffect2 = effect
      saveAction(action)
      return undefined
    }
  }

  for (const action of STATE.idActionMap.values()) {
    if (
      action.channeled &&
      (action.ability.id === e.abilityId || action.ability.name === e.abilityName)
    ) {
      if (action.duration === 0 && selfSourced) {
        action.channelStartTime = now
        action.channelEndTime = now + e.hitValue
        action.channelUnitId = e.unitId
        return undefined
      }
    }
  }
  return undefined
}

export function handlePlayerCombatEvent(e: CombatEvent, now: number): undefined {
  if (
    e.result !== ACTION_RESULT_EFFECT_GAINED &&
    e.result !== ACTION_RESULT_EFFECT_GAINED_DURATION &&
    e.result !== ACTION_RESULT_DAMAGE &&
    e.result !== ACTION_RESULT_CRITICAL_DAMAGE
  ) {
    return undefined
  }

  if (e.result === ACTION_RESULT_DAMAGE || e.result === ACTION_RESULT_CRITICAL_DAMAGE) {
    for (const action of STATE.idActionMap.values()) {
      const stackEffect2 = action.stackEffect2
      if (
        stackEffect2 !== undefined &&
        stackEffect2.stackCount > 0 &&
        stackEffect2.ability.id === e.abilityId
      ) {
        stackEffect2.stackCount = stackEffect2.stackCount - 1
      }
    }
  }

  if (e.result === ACTION_RESULT_EFFECT_GAINED && e.sourceType === e.targetType) {
    const consumed = handleTickGain(e, now)
    if (!consumed) {
      handleEffectGainedQueue(e, now)
    }
  }

  if (e.result === ACTION_RESULT_EFFECT_GAINED_DURATION) {
    handleEffectGainedDuration(e, now)
  }

  return undefined
}
