import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  ABILITY_ID_ZEN,
  BAD_ABILITY,
  getFormattedAbilityName,
  LIBCOMBAT_EVENT_EFFECTS_IN,
  LIBCOMBAT_EVENT_EFFECTS_OUT,
  LIBCOMBAT_EVENT_GROUPEFFECTS_IN,
  LIBCOMBAT_EVENT_GROUPEFFECTS_OUT,
  SPECIAL_DEBUFFS,
  STATUS_EFFECT_IDS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { addToEffectBuffer } from "@akasha/temper-combat-addon/combat-lib-effects-buffer"
import { LOG_LEVEL_VERBOSE, log } from "@akasha/temper-combat-addon/combat-lib-log"
import type {
  CombatEventHandler,
  EffectChangedHandler,
} from "@akasha/temper-combat-addon/combat-lib-message-types"
import { DATA, getCurrentFight } from "@akasha/temper-combat-addon/combat-lib-state"
import { getNewStats } from "@akasha/temper-combat-addon/combat-lib-stats"
import {
  updateForceOfNatureData,
  updateZenData,
} from "@akasha/temper-combat-addon/combat-lib-units"

const GROUP_EFFECT_NONE = 0
const GROUP_EFFECT_IN = 1
const GROUP_EFFECT_OUT = 2

function buffEventHandler(
  _isspecial: boolean,
  groupeffect: number,
  _eventCode: number | undefined,
  changeType: number,
  effectSlot: number,
  _effectName: string | undefined,
  unitTag: string | undefined,
  _beginTime: number | undefined,
  endTime: number,
  stackCount: number,
  _iconName: string | undefined,
  _buffType: number | undefined,
  effectType: number,
  abilityType: number,
  _statusEffectType: number | undefined,
  unitName: string,
  unitId: number,
  abilityId: number,
  sourceType: number
): undefined {
  if (
    (changeType !== EFFECT_RESULT_GAINED &&
      changeType !== EFFECT_RESULT_FADED &&
      !(changeType === EFFECT_RESULT_UPDATED && stackCount > 1)) ||
    unitName === "Offline" ||
    unitId == null
  ) {
    return undefined
  }

  log(
    "events",
    LOG_LEVEL_VERBOSE,
    "%s %s the %s %dx %s (%d, ET: %d, %s, %d)",
    unitName,
    changeType,
    effectType === BUFF_EFFECT_TYPE_BUFF ? "buff" : "debuff",
    stackCount,
    getFormattedAbilityName(abilityId),
    abilityId,
    abilityType,
    unitTag,
    sourceType
  )

  if (BAD_ABILITY[abilityId] === true) {
    return undefined
  }

  if (unitTag != null && zo_strsub(unitTag, 1, 5) === "group" && AreUnitsEqual(unitTag, "player")) {
    return undefined
  }
  if (
    unitTag != null &&
    zo_strsub(unitTag, 1, 11) !== "reticleover" &&
    (AreUnitsEqual(unitTag, "reticleover") ||
      AreUnitsEqual(unitTag, "reticleoverplayer") ||
      AreUnitsEqual(unitTag, "reticleovertarget"))
  ) {
    return undefined
  }

  const timems = GetGameTimeMilliseconds()

  let eventid: number
  if (groupeffect === GROUP_EFFECT_IN) {
    eventid = LIBCOMBAT_EVENT_GROUPEFFECTS_IN
  } else if (groupeffect === GROUP_EFFECT_OUT) {
    eventid = LIBCOMBAT_EVENT_GROUPEFFECTS_OUT
  } else if (unitTag != null && zo_strsub(unitTag, 1, 6) === "player") {
    eventid = LIBCOMBAT_EVENT_EFFECTS_IN
  } else {
    eventid = LIBCOMBAT_EVENT_EFFECTS_OUT
  }
  const stacks = zo_max(1, stackCount)

  const currentfight = getCurrentFight()
  const inCombat = currentfight.prepared

  if (
    inCombat !== true &&
    unitTag !== "player" &&
    (changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_UPDATED)
  ) {
    addToEffectBuffer(
      endTime,
      abilityType,
      eventid,
      timems,
      unitId,
      abilityId,
      changeType,
      effectType,
      stacks,
      sourceType,
      effectSlot
    )
    return undefined
  } else if (inCombat === true) {
    const unit = currentfight.units[unitId]

    if (unitTag === "player" || unitId === DATA.playerid) {
      getNewStats(currentfight, timems)
    }
    if (sourceType !== COMBAT_UNIT_TYPE_PLAYER || abilityId !== ABILITY_ID_ZEN) {
      fireCombatEvent(
        eventid,
        timems,
        unitId,
        abilityId,
        changeType,
        effectType,
        stacks,
        sourceType,
        effectSlot
      )
    }

    if (unit !== undefined) {
      unit.starttime = unit.starttime ?? timems
      unit.endtime = timems

      if (
        sourceType === COMBAT_UNIT_TYPE_PLAYER &&
        (abilityId === ABILITY_ID_ZEN || abilityType === ABILITY_TYPE_DAMAGE)
      ) {
        updateZenData(
          unit,
          eventid,
          timems,
          unitId,
          abilityId,
          changeType,
          effectType,
          stacks,
          sourceType,
          effectSlot,
          abilityType
        )
      }
      if (
        STATUS_EFFECT_IDS[abilityId] === true &&
        (sourceType === COMBAT_UNIT_TYPE_PLAYER ||
          (unitName === "" &&
            unit.forceOfNature[abilityId] === true &&
            SPECIAL_DEBUFFS[abilityId] !== undefined))
      ) {
        updateForceOfNatureData(unit, eventid, timems, unitId, abilityId, changeType)
      }
    }
  }
  return undefined
}

export function onEffectChanged(this: void, ...args: Parameters<EffectChangedHandler>): undefined {
  return buffEventHandler(false, GROUP_EFFECT_NONE, ...args)
}

export function onGroupEffectIn(this: void, ...args: Parameters<EffectChangedHandler>): undefined {
  return buffEventHandler(false, GROUP_EFFECT_IN, ...args)
}

export function onGroupEffectOut(this: void, ...args: Parameters<EffectChangedHandler>): undefined {
  return buffEventHandler(false, GROUP_EFFECT_OUT, ...args)
}

export function onSourceBuggedEffectChanged(
  this: void,
  ...args: Parameters<EffectChangedHandler>
): undefined {
  const [
    eventCode,
    changeType,
    effectSlot,
    effectName,
    unitTag,
    beginTime,
    endTime,
    stackCount,
    iconName,
    buffType,
    effectType,
    abilityType,
    statusEffectType,
    unitName,
    unitId,
    abilityId,
  ] = args
  return buffEventHandler(
    false,
    GROUP_EFFECT_OUT,
    eventCode,
    changeType,
    effectSlot,
    effectName,
    unitTag,
    beginTime,
    endTime,
    stackCount,
    iconName,
    buffType,
    effectType,
    abilityType,
    statusEffectType,
    unitName,
    unitId,
    abilityId,
    COMBAT_UNIT_TYPE_GROUP
  )
}

const RESULT_TO_CHANGE_TYPE: Record<number, number> = {
  [ACTION_RESULT_EFFECT_GAINED_DURATION]: EFFECT_RESULT_GAINED,
  [ACTION_RESULT_EFFECT_FADED]: EFFECT_RESULT_FADED,
  [ACTION_RESULT_EFFECT_GAINED]: EFFECT_RESULT_UPDATED,
}

const DURATION_CACHE: Record<number, number> = {}

function specialBuffEventHandler(
  isdebuff: boolean,
  ...args: Parameters<CombatEventHandler>
): undefined {
  const [, result, , , , , , sourceType, targetName, , hitValue, , , , , targetUnitId, abilityId] =
    args

  const now = GetGameTimeSeconds()

  if (BAD_ABILITY[abilityId] === true || (result === ACTION_RESULT_EFFECT_GAINED && hitValue < 2)) {
    return undefined
  }

  if (result === ACTION_RESULT_EFFECT_GAINED_DURATION) {
    DURATION_CACHE[abilityId] = hitValue
  } else if (DURATION_CACHE[abilityId] === undefined && result === ACTION_RESULT_EFFECT_FADED) {
    DURATION_CACHE[abilityId] = hitValue
  }

  let stackCount = 1
  let duration = hitValue

  if (result === ACTION_RESULT_EFFECT_GAINED) {
    const cachedDuration = DURATION_CACHE[abilityId]
    if (cachedDuration !== undefined) {
      duration = cachedDuration
      stackCount = hitValue
    } else {
      return undefined
    }
  }

  const changeType = RESULT_TO_CHANGE_TYPE[result]
  if (changeType === undefined) {
    return undefined
  }

  const effectType = isdebuff ? BUFF_EFFECT_TYPE_DEBUFF : BUFF_EFFECT_TYPE_BUFF
  const endTime = now + duration / 1000

  const targetUnit = getCurrentFight().units[targetUnitId]
  const unitTag = targetUnit !== undefined ? targetUnit.unitTag : undefined

  return buffEventHandler(
    true,
    GROUP_EFFECT_NONE,
    undefined,
    changeType,
    0,
    undefined,
    unitTag,
    undefined,
    endTime,
    stackCount,
    undefined,
    undefined,
    effectType,
    ABILITY_TYPE_BONUS,
    undefined,
    targetName,
    targetUnitId,
    abilityId,
    sourceType
  )
}

export function onSpecialBuffEvent(this: void, ...args: Parameters<CombatEventHandler>): undefined {
  return specialBuffEventHandler(false, ...args)
}

export function onSpecialDebuffEvent(
  this: void,
  ...args: Parameters<CombatEventHandler>
): undefined {
  return specialBuffEventHandler(true, ...args)
}

const IS_TYPE_FRIENDLY: Record<number, boolean> = {
  [COMBAT_UNIT_TYPE_PLAYER]: true,
  [COMBAT_UNIT_TYPE_PLAYER_PET]: true,
  [COMBAT_UNIT_TYPE_GROUP]: true,
  [COMBAT_UNIT_TYPE_TARGET_DUMMY]: false,
  [COMBAT_UNIT_TYPE_OTHER]: false,
}

const CUSTOM_ABILITY_TYPE_LIST: Record<number, number> = {}

export function onCustomEvent(this: void, ...args: Parameters<CombatEventHandler>): undefined {
  const [, , , , , , , sourceType, , targetType, , , , , , , abilityId] = args

  if (
    sourceType != null &&
    targetType != null &&
    IS_TYPE_FRIENDLY[sourceType] !== IS_TYPE_FRIENDLY[targetType]
  ) {
    CUSTOM_ABILITY_TYPE_LIST[abilityId] = BUFF_EFFECT_TYPE_DEBUFF
  } else {
    CUSTOM_ABILITY_TYPE_LIST[abilityId] =
      CUSTOM_ABILITY_TYPE_LIST[abilityId] ?? BUFF_EFFECT_TYPE_BUFF
  }
  return undefined
}

export function getCustomAbilityList(): Record<number, number> {
  return CUSTOM_ABILITY_TYPE_LIST
}
