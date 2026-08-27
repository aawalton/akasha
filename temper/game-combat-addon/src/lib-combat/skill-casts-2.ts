import { abilityAdditions, abilityConversions } from "./ability-tables"
import { fireCombatEvent } from "./callbacks"
import {
  LIBCOMBAT_EVENT_MESSAGES,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
  LIBCOMBAT_MESSAGE_WEAPONSWAP,
  LIBCOMBAT_SKILLSTATUS_QUEUE,
} from "./constants"
import { LOG_LEVEL_DEBUG, LOG_LEVEL_VERBOSE, LOG_LEVEL_WARNING, log } from "./log"
import type { SkillRegistrationData } from "./message-types"
import {
  data,
  eventGroupActive,
  getCurrentFight,
  isProjectile,
  lastQueuedAbilities,
  setSlotSkills,
} from "./state"
import { getNewStats } from "./stats"
import { getSlottedAbilityId } from "./stats-2"

export const IdToReducedSlot: Record<number, number> = {}

let skillsGroupUpdateHook: ((this: void) => void) | undefined

export function setSkillsGroupUpdateHook(fn: (this: void) => void): undefined {
  skillsGroupUpdateHook = fn
}

function getSkillRegistrationData(abilityId: number): SkillRegistrationData {
  const [channeled, castTimeRaw] = GetAbilityCastInfo(abilityId, undefined, "player")
  const castTime = castTimeRaw ?? 0

  const conversion = abilityConversions[abilityId]

  const result =
    (conversion !== undefined ? conversion[1] : undefined) ??
    (castTime > 0 ? ACTION_RESULT_BEGIN : undefined)

  const result2 =
    (conversion !== undefined ? conversion[3] : undefined) ??
    (castTime > 0
      ? ACTION_RESULT_EFFECT_GAINED
      : channeled === true
        ? ACTION_RESULT_EFFECT_FADED
        : undefined)

  const convertedId = (conversion !== undefined ? conversion[0] : undefined) ?? abilityId
  const convertedId2 = (conversion !== undefined ? conversion[2] : undefined) ?? abilityId

  if (result2 !== undefined) {
    return [convertedId, result, convertedId2, result2]
  }
  return [convertedId, result]
}

function updateSlotSkillEvents(): undefined {
  if (eventGroupActive["Skills"] !== true) {
    return undefined
  }

  const newSlotSkills: SkillRegistrationData[] = []
  setSlotSkills(newSlotSkills)

  const registeredIds: Record<number, boolean> = {}

  for (const [, bar] of pairs(data.skillBars)) {
    for (const [, abilityId] of pairs(bar)) {
      if (registeredIds[abilityId] === undefined) {
        registeredIds[abilityId] = true

        newSlotSkills[newSlotSkills.length] = getSkillRegistrationData(abilityId)

        const addition = abilityAdditions[abilityId]
        if (addition !== undefined) {
          newSlotSkills[newSlotSkills.length] = getSkillRegistrationData(addition)
        }
      }
    }
  }

  if (skillsGroupUpdateHook === undefined) {
    error("lib-combat: skills group update hook not wired")
  }
  skillsGroupUpdateHook()
  return undefined
}

export function getCurrentSkillBars(this: void): undefined {
  const skillBars = data.skillBars
  const scribedSkills = data.scribedSkills
  const bar = data.bar

  const currentbar: Record<number, number> = {}
  skillBars[bar] = currentbar
  const hotbarCategory = GetActiveHotbarCategory()

  for (let i = 1; i <= 8; i++) {
    const [id, scribedAbilityId] = getSlottedAbilityId(i, hotbarCategory)
    currentbar[i] = id
    const reducedslot = (bar - 1) * 10 + i
    const conversion = abilityConversions[id]
    const convertedId = (conversion !== undefined ? conversion[0] : undefined) ?? id

    IdToReducedSlot[convertedId] = reducedslot

    const convertedId2 = conversion !== undefined ? conversion[2] : undefined
    if (convertedId2 !== undefined) {
      IdToReducedSlot[convertedId2] = reducedslot
    }
    if (scribedAbilityId !== undefined && scribedSkills[id] === undefined) {
      const [primaryScriptId, secondaryScriptId, tertiaryScriptId] =
        GetCraftedAbilityActiveScriptIds(scribedAbilityId)
      const scripts = [primaryScriptId, secondaryScriptId, tertiaryScriptId]
      scribedSkills[id] = scripts
      log("debug", LOG_LEVEL_DEBUG, "ScribedSkill: ", scribedAbilityId, ...scripts)
    }
  }
  updateSlotSkillEvents()
  return undefined
}

export function onWeaponSwap(this: void, _eventCode: number, _isHotbarSwap: boolean): undefined {
  const newbar = GetActiveHotbarCategory() + 1
  if (data.bar === newbar) {
    return undefined
  }

  data.bar = newbar
  getCurrentSkillBars()
  const currentfight = getCurrentFight()
  const inCombat = currentfight.prepared

  if (inCombat === true) {
    const timems = GetGameTimeMilliseconds()
    fireCombatEvent(LIBCOMBAT_EVENT_MESSAGES, timems, LIBCOMBAT_MESSAGE_WEAPONSWAP, data.bar)

    getNewStats(currentfight, timems)
  }
  return undefined
}

export function onQueueEvent(
  this: void,
  _eventCode: number,
  _result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  _targetName: string,
  _targetType: number,
  _hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  _targetUnitId: number,
  abilityId: number
): undefined {
  if (data.inCombat === false) {
    return undefined
  }

  const timems = GetGameTimeMilliseconds()

  const conversion = abilityConversions[abilityId]
  const convertedId = (conversion !== undefined ? conversion[0] : undefined) ?? abilityId

  const reducedslot = IdToReducedSlot[convertedId]

  if (reducedslot === undefined) {
    log(
      "events",
      LOG_LEVEL_WARNING,
      "reducedslot missing on queue event: [%.3f s] %s (%d)",
      (timems - getCurrentFight().combatstart) / 1000,
      GetAbilityName(abilityId),
      abilityId
    )
    return undefined
  }

  lastQueuedAbilities[abilityId] = timems

  fireCombatEvent(
    LIBCOMBAT_EVENT_SKILL_TIMINGS,
    timems,
    reducedslot,
    abilityId,
    LIBCOMBAT_SKILLSTATUS_QUEUE
  )
  return undefined
}

export function onProjectileEvent(
  this: void,
  _eventCode: number,
  _result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  _targetName: string,
  targetType: number,
  hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  _targetUnitId: number,
  abilityId: number
): undefined {
  if (hitValue <= 1 || targetType === COMBAT_UNIT_TYPE_PLAYER || isProjectile[abilityId] === true) {
    return undefined
  }

  isProjectile[abilityId] = true

  log(
    "events",
    LOG_LEVEL_VERBOSE,
    "[%.3f s] projectile: %s (%d)",
    (GetGameTimeMilliseconds() - getCurrentFight().combatstart) / 1000,
    GetAbilityName(abilityId),
    abilityId
  )

  return undefined
}
