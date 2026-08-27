import { fireCombatEvent } from "./callbacks"
import { abilityIdZen, BadAbility, LIBCOMBAT_EVENT_EFFECTS_IN, StatusEffectIds } from "./constants"
import type { EffectBufferEntry } from "./message-types"
import { clearEffectBuffer, data, effectBuffer, eventGroupActive, getCurrentFight } from "./state"
import { onTFSChanged } from "./stats"
import { getShadowBonus } from "./stats-2"
import { updateForceOfNatureData, updateZenData } from "./units"

let lastPurge = 0

export function purgeEffectBuffer(timems: number): undefined {
  for (const [id, unit] of pairs(effectBuffer)) {
    for (const [, entry] of pairs(unit)) {
      const timeend = entry[0]

      if (timems / 1000 > timeend) {
        delete unit[id]
      }
    }
  }
  return undefined
}

export function addToEffectBuffer(
  endTime: number,
  abilityType: number,
  eventId: number,
  timems: number,
  unitId: number,
  abilityId: number,
  changeType: number,
  effectType: number,
  stacks: number,
  sourceType: number,
  effectSlot: number
): undefined {
  const entry: EffectBufferEntry = [
    endTime,
    [eventId, timems, unitId, abilityId, changeType, effectType, stacks, sourceType, effectSlot],
    abilityType,
  ]

  const unit = effectBuffer[unitId]

  if (unit === undefined) {
    effectBuffer[unitId] = { [abilityId]: entry }
  } else {
    unit[abilityId] = entry
  }

  if (timems - lastPurge > 1000) {
    purgeEffectBuffer(timems)
    lastPurge = timems
  }
  return undefined
}

export function getPlayerBuffs(timems: number): undefined {
  const newtime = timems

  if (eventGroupActive.Effects === false) {
    return undefined
  }

  if (data.playerid === undefined) {
    zo_callLater(() => {
      getPlayerBuffs(timems)
    }, 100)
    return undefined
  }

  data.critBonusMundus = 0

  for (let i = 1; i <= GetNumBuffs("player"); i++) {
    const [, , , effectSlot, stackCount, , , effectType, abilityType, , abilityId, , castByPlayer] =
      GetUnitBuffInfo("player", i)

    const unitType = castByPlayer ? COMBAT_UNIT_TYPE_PLAYER : COMBAT_UNIT_TYPE_NONE
    const stacks = zo_max(stackCount, 1)
    const playerid = data.playerid

    if (BadAbility[abilityId] !== true) {
      fireCombatEvent(
        LIBCOMBAT_EVENT_EFFECTS_IN,
        newtime,
        playerid,
        abilityId,
        EFFECT_RESULT_GAINED,
        effectType,
        stacks,
        unitType,
        effectSlot
      )
    }

    if (abilityId === 13984) {
      getShadowBonus(effectSlot)
    }

    if (abilityId === 51176) {
      onTFSChanged(
        undefined,
        EFFECT_RESULT_GAINED,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        stackCount
      )
    }
  }
  return undefined
}

export function getOtherBuffs(timems: number): undefined {
  const newtime = timems

  for (const [unitId, unitData] of pairs(effectBuffer)) {
    for (const [abilityId, abilityData] of pairs(unitData)) {
      const [, logdata, abilityType] = abilityData

      logdata[1] = newtime
      const [
        eventId,
        logTimems,
        logUnitId,
        logAbilityId,
        changeType,
        effectType,
        stacks,
        sourceType,
        effectSlot,
      ] = logdata

      if (sourceType !== COMBAT_UNIT_TYPE_PLAYER || abilityId !== abilityIdZen) {
        fireCombatEvent(
          eventId,
          logTimems,
          logUnitId,
          logAbilityId,
          changeType,
          effectType,
          stacks,
          sourceType,
          effectSlot
        )
      }

      if (
        sourceType === COMBAT_UNIT_TYPE_PLAYER &&
        (abilityId === abilityIdZen || abilityType === ABILITY_TYPE_DAMAGE)
      ) {
        const unit = getCurrentFight().units[unitId]
        if (unit !== undefined) {
          updateZenData(
            unit,
            eventId,
            logTimems,
            logUnitId,
            logAbilityId,
            changeType,
            effectType,
            stacks,
            sourceType,
            effectSlot,
            abilityType
          )
        }
      }

      if (sourceType === COMBAT_UNIT_TYPE_PLAYER && StatusEffectIds[abilityId] === true) {
        const unit = getCurrentFight().units[unitId]
        if (unit !== undefined) {
          updateForceOfNatureData(unit, eventId, logTimems, logUnitId, logAbilityId, changeType)
        }
      }
    }
  }

  clearEffectBuffer()
  return undefined
}
