import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  LIBCOMBAT_EVENT_DEATH,
  LIBCOMBAT_STATE_ALIVE,
  LIBCOMBAT_STATE_DEAD,
  LIBCOMBAT_STATE_RESURRECTED,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { prepareFight } from "@akasha/temper-combat-addon/combat-lib-fight"
import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-lib-log"
import type { CombatEventHandler } from "@akasha/temper-combat-addon/combat-lib-message-types"
import { DATA, getCurrentFight } from "@akasha/temper-combat-addon/combat-lib-state"
import {
  addUnitCacheEvent,
  getUnitCache,
  onUnitCacheDeath,
} from "@akasha/temper-combat-addon/combat-lib-unit-cache"

const LAST_DEATHS: Record<number, number> = {}

function checkForWipe(): undefined {
  if (!IsUnitDeadOrReincarnating("player")) {
    return undefined
  }

  const currentfight = getCurrentFight()

  if (DATA.inGroup === false) {
    currentfight.isWipe = true
  } else if (DATA.inGroup === true) {
    const loc = GetUnitZoneIndex("player")

    for (let i = 1; i <= GetGroupSize(); i++) {
      const tag = ZO_CachedStrFormat("group<<1>>", i)

      const unitId = DATA.groupInfo.tagToId[tag]
      const unit = unitId !== undefined ? currentfight.units[unitId] : undefined

      if (unit !== undefined && unit.isDead !== true && GetUnitZoneIndex(tag) === loc) {
        return undefined
      }
    }
  }

  currentfight.isWipe = true

  log("DoA", LOG_LEVEL_DEBUG, "=== This is a wipe ! ===")
  return undefined
}

export function onDeathStateChanged(
  this: void,
  _eventCode: number,
  unitTag: string,
  isDead: boolean
): undefined {
  const unitId =
    unitTag === "player" && DATA.playerid !== undefined
      ? DATA.playerid
      : DATA.groupInfo.tagToId[unitTag]

  log(
    "debug",
    LOG_LEVEL_DEBUG,
    "OnDeathStateChanged: %s (%s) is dead: %s",
    unitTag,
    tostring(unitId),
    tostring(isDead)
  )

  if (DATA.inCombat === false || unitId === undefined) {
    log("debug", LOG_LEVEL_DEBUG, "OnDeathStateChanged: Combat: %s", tostring(DATA.inCombat))
    return undefined
  }

  const unit = getCurrentFight().units[unitId]
  if (unit !== undefined) {
    unit.isDead = isDead
  } else {
    log("debug", LOG_LEVEL_DEBUG, "OnDeathStateChanged: no unit")
    return undefined
  }

  const timems = GetGameTimeMilliseconds()

  if (isDead) {
    const lasttime = LAST_DEATHS[unitId]

    if (lasttime !== undefined && lasttime - timems < 1000) {
      return undefined
    }

    const cache = getUnitCache(unitId)
    if (cache === undefined) {
      error("lib-combat: unit cache missing for death-state change")
    }
    onUnitCacheDeath(cache, timems)

    log("debug", LOG_LEVEL_DEBUG, "OnDeathStateChanged: fire callback")
    fireCombatEvent(LIBCOMBAT_EVENT_DEATH, timems, LIBCOMBAT_STATE_DEAD, unitId)

    checkForWipe()
  } else {
    fireCombatEvent(LIBCOMBAT_EVENT_DEATH, timems, LIBCOMBAT_STATE_ALIVE, unitId)
  }
  return undefined
}

export function onPlayerReincarnated(this: void, _eventCode: number): undefined {
  log("DoA", LOG_LEVEL_DEBUG, "You revived")
  return undefined
}

export const onDeath: CombatEventHandler = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId,
  abilityId
) => {
  const timems = GetGameTimeMilliseconds()

  if (targetUnitId == null || targetUnitId === 0) {
    return undefined
  }

  const unitdata = getCurrentFight().units[targetUnitId]

  if (
    unitdata === undefined ||
    (unitdata.unitType !== COMBAT_UNIT_TYPE_PLAYER && unitdata.unitType !== COMBAT_UNIT_TYPE_GROUP)
  ) {
    return undefined
  }

  LAST_DEATHS[targetUnitId] = timems

  const cache = getUnitCache(targetUnitId)
  if (cache === undefined) {
    error("lib-combat: unit cache missing for death event")
  }
  onUnitCacheDeath(cache, timems)

  fireCombatEvent(LIBCOMBAT_EVENT_DEATH, timems, LIBCOMBAT_STATE_DEAD, targetUnitId, abilityId)

  checkForWipe()
  return undefined
}

export const onResurrect: CombatEventHandler = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) => {
  const timems = GetGameTimeMilliseconds()

  if (targetUnitId == null || targetUnitId === 0 || DATA.inCombat === false) {
    return undefined
  }

  const unitdata = getCurrentFight().units[targetUnitId]

  const legacyType = unitdata !== undefined ? unitdata.type : undefined

  if (unitdata === undefined || legacyType !== COMBAT_UNIT_TYPE_GROUP) {
    return undefined
  }

  fireCombatEvent(LIBCOMBAT_EVENT_DEATH, timems, LIBCOMBAT_STATE_ALIVE, targetUnitId)
  return undefined
}

export function onResurrectResult(
  this: void,
  _eventCode: number,
  targetCharacterName: string,
  result: number,
  _targetDisplayName: string
): undefined {
  log("DoA", LOG_LEVEL_DEBUG, "OnResurrectResult: %s", targetCharacterName)

  const timems = GetGameTimeMilliseconds()

  if (result !== RESURRECT_RESULT_SUCCESS) {
    return undefined
  }

  const name = ZO_CachedStrFormat(SI_UNIT_NAME, targetCharacterName) ?? ""

  const unitId = DATA.groupInfo.nameToId[name]

  if (unitId === undefined) {
    return undefined
  }

  fireCombatEvent(LIBCOMBAT_EVENT_DEATH, timems, LIBCOMBAT_STATE_RESURRECTED, unitId, DATA.playerid)
  return undefined
}

export function onResurrectRequest(
  this: void,
  _eventCode: number,
  requesterCharacterName: string,
  _timeLeftToAccept: number,
  _requesterDisplayName: string
): undefined {
  log("DoA", LOG_LEVEL_DEBUG, "OnResurrectRequest: %s", requesterCharacterName)

  const timems = GetGameTimeMilliseconds()

  const name = ZO_CachedStrFormat(SI_UNIT_NAME, requesterCharacterName) ?? ""

  const unitId = DATA.groupInfo.nameToId[name]

  if (unitId === undefined) {
    return undefined
  }

  fireCombatEvent(LIBCOMBAT_EVENT_DEATH, timems, LIBCOMBAT_STATE_RESURRECTED, DATA.playerid, unitId)
  return undefined
}

export function groupCombatEventHandler(
  isheal: boolean,
  result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  targetName: string,
  _targetType: number,
  hitValue: number,
  powerType: number,
  damageType: number,
  _log: boolean,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number,
  overflow: number
): undefined {
  if (
    hitValue + (overflow ?? 0) < 0 ||
    !(targetUnitId > 0) ||
    (DATA.inCombat === false &&
      (result === ACTION_RESULT_DOT_TICK_CRITICAL || result === ACTION_RESULT_DOT_TICK || isheal))
  ) {
    return undefined
  }

  const timems = GetGameTimeMilliseconds()

  const currentfight = getCurrentFight()
  if (currentfight.dpsstart === undefined) {
    prepareFight(currentfight)
  }

  damageType = isheal ? powerType : damageType

  const cache = getUnitCache(targetUnitId)
  if (cache === undefined) {
    error("lib-combat: unit cache missing for group combat event")
  }
  addUnitCacheEvent(
    cache,
    timems,
    result,
    sourceUnitId,
    abilityId,
    hitValue,
    damageType,
    overflow ?? 0
  )

  if ((overflow ?? 0) > 0 && !isheal) {
    log("debug", LOG_LEVEL_DEBUG, "GroupCombatEventHandler: %s has overflow damage!", targetName)
    onUnitCacheDeath(cache, timems)
  }
  return undefined
}

export const onCombatEventGrpDmgIn: CombatEventHandler = (_eventCode, ...args) => {
  const targetUnitId = args[14]

  const unit = getCurrentFight().units[targetUnitId]
  const targetType = unit !== undefined ? unit.unitType : undefined

  if (
    targetType === undefined ||
    (targetType !== COMBAT_UNIT_TYPE_GROUP && targetType !== COMBAT_UNIT_TYPE_PLAYER)
  ) {
    return undefined
  }

  groupCombatEventHandler(false, ...args)
  return undefined
}
