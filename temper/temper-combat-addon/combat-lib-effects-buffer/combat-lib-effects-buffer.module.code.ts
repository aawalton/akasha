import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  ABILITY_ID_ZEN,
  BAD_ABILITY,
  LIBCOMBAT_EVENT_EFFECTS_IN,
  STATUS_EFFECT_IDS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import type { EffectBufferEntry } from "@akasha/temper-combat-addon/combat-lib-message-types"
import {
  clearEffectBuffer,
  DATA,
  EFFECT_BUFFER,
  EVENT_GROUP_ACTIVE,
  getCurrentFight,
} from "@akasha/temper-combat-addon/combat-lib-state"
import { onTFSChanged } from "@akasha/temper-combat-addon/combat-lib-stats"
import { getShadowBonus } from "@akasha/temper-combat-addon/combat-lib-stats-boss"
import {
  updateForceOfNatureData,
  updateZenData,
} from "@akasha/temper-combat-addon/combat-lib-units"

let LAST_PURGE = 0

export function purgeEffectBuffer(timems: number): undefined {
  for (const [id, unit] of pairs(EFFECT_BUFFER)) {
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

  const unit = EFFECT_BUFFER[unitId]

  if (unit === undefined) {
    EFFECT_BUFFER[unitId] = { [abilityId]: entry }
  } else {
    unit[abilityId] = entry
  }

  if (timems - LAST_PURGE > 1000) {
    purgeEffectBuffer(timems)
    LAST_PURGE = timems
  }
  return undefined
}

export function getPlayerBuffs(timems: number): undefined {
  const newtime = timems

  if (EVENT_GROUP_ACTIVE.Effects === false) {
    return undefined
  }

  if (DATA.playerid === undefined) {
    zo_callLater(() => {
      getPlayerBuffs(timems)
    }, 100)
    return undefined
  }

  DATA.critBonusMundus = 0

  for (let i = 1; i <= GetNumBuffs("player"); i++) {
    const [, , , effectSlot, stackCount, , , effectType, , , abilityId, , castByPlayer] =
      GetUnitBuffInfo("player", i)

    const unitType = castByPlayer ? COMBAT_UNIT_TYPE_PLAYER : COMBAT_UNIT_TYPE_NONE
    const stacks = zo_max(stackCount, 1)
    const playerid = DATA.playerid

    if (BAD_ABILITY[abilityId] !== true) {
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

  for (const [unitId, unitData] of pairs(EFFECT_BUFFER)) {
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

      if (sourceType !== COMBAT_UNIT_TYPE_PLAYER || abilityId !== ABILITY_ID_ZEN) {
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
        (abilityId === ABILITY_ID_ZEN || abilityType === ABILITY_TYPE_DAMAGE)
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

      if (sourceType === COMBAT_UNIT_TYPE_PLAYER && STATUS_EFFECT_IDS[abilityId] === true) {
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
