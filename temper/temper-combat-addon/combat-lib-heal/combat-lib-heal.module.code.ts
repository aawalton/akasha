import { combatEventHandler } from "@akasha/temper-combat-addon/combat-lib-damage"
import { groupCombatEventHandler } from "@akasha/temper-combat-addon/combat-lib-death"
import type { CombatEventHandler } from "@akasha/temper-combat-addon/combat-lib-message-types"
import { DATA, getCurrentFight } from "@akasha/temper-combat-addon/combat-lib-state"

export const onCombatEventHeal: CombatEventHandler = (
  eventCode,
  result,
  isError,
  abilityName,
  abilityGraphic,
  abilityActionSlotType,
  sourceName,
  sourceType,
  targetName,
  targetType,
  hitValue,
  powerType,
  damageType,
  log,
  sourceUnitId,
  targetUnitId,
  abilityId,
  overflow
) => {
  if (
    hitValue + (overflow ?? 0) < 2 ||
    (DATA.inCombat === false && GetGameTimeMilliseconds() - getCurrentFight().combatend >= 50)
  ) {
    return undefined
  }

  combatEventHandler(
    true,
    eventCode,
    result,
    isError,
    abilityName,
    abilityGraphic,
    abilityActionSlotType,
    sourceName,
    sourceType,
    targetName,
    targetType,
    hitValue,
    powerType,
    damageType,
    log,
    sourceUnitId,
    targetUnitId,
    abilityId,
    overflow
  )
  return undefined
}

export const onCombatEventHealIn: CombatEventHandler = (
  eventCode,
  result,
  isError,
  abilityName,
  abilityGraphic,
  abilityActionSlotType,
  sourceName,
  sourceType,
  targetName,
  targetType,
  ...rest
) => {
  if (
    (sourceType === COMBAT_UNIT_TYPE_PLAYER || sourceType === COMBAT_UNIT_TYPE_PLAYER_PET) &&
    (targetType === COMBAT_UNIT_TYPE_PLAYER || targetType === COMBAT_UNIT_TYPE_PLAYER_PET)
  ) {
    return undefined
  }

  onCombatEventHeal(
    eventCode,
    result,
    isError,
    abilityName,
    abilityGraphic,
    abilityActionSlotType,
    sourceName,
    sourceType,
    targetName,
    targetType,
    ...rest
  )
  return undefined
}

export const onCombatEventHealGrp: CombatEventHandler = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  targetType,
  hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) => {
  const currentfight = getCurrentFight()

  if (
    targetType === 2 ||
    targetUnitId == null ||
    hitValue < 2 ||
    (DATA.inCombat === false && GetGameTimeMilliseconds() - (currentfight.combatend ?? 0) >= 50)
  ) {
    return undefined
  }

  currentfight.grplog[currentfight.grplog.length] = [targetUnitId, hitValue, "heal"]
  return undefined
}

export const onCombatEventGrpHealIn: CombatEventHandler = (_eventCode, ...args) => {
  const targetUnitId = args[14]

  const unit = getCurrentFight().units[targetUnitId]
  const targetType = unit !== undefined ? unit.unitType : undefined

  if (
    targetType === undefined ||
    (targetType !== COMBAT_UNIT_TYPE_GROUP && targetType !== COMBAT_UNIT_TYPE_PLAYER)
  ) {
    return undefined
  }

  groupCombatEventHandler(true, ...args)
  return undefined
}
