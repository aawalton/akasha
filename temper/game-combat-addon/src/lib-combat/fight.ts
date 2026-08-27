import { fireCombatEvent } from "./callbacks"
import {
  COMBAT_TIMEOUT,
  LIB_EVENT_NAMESPACE,
  LIBCOMBAT_EVENT_FIGHTSUMMARY,
  LIBCOMBAT_EVENT_MESSAGES,
  LIBCOMBAT_MESSAGE_COMBATEND,
  LIBCOMBAT_MESSAGE_COMBATSTART,
} from "./constants"
import { getOtherBuffs, getPlayerBuffs, purgeEffectBuffer } from "./effects-buffer"
import { createFight, finishFight } from "./fight-2"
import { getCritBonusFromCP, getCurrentCP, printDamageStats, updateStats } from "./fight-stats"
import { LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, log } from "./log"
import { getCurrentSkillBars } from "./skill-casts-2"
import {
  clearDamageShieldBuffer,
  clearEffectBuffer,
  clearIsProjectile,
  clearLastAbilityActivations,
  clearLastQueuedAbilities,
  clearUsedCastTimeAbility,
  data,
  getCurrentFight,
  isInPortalWorld,
  setCurrentFight,
  setIsInPortalWorld,
  setLastBossHealthValue,
} from "./state"
import { getNewStats } from "./stats"
import { initStatusEffectBonuses } from "./stats-2"
import type { Fight, FightCharData } from "./types"
import { clearUnitCaches } from "./unit-cache"

let reset = false

const updateRegistrationName = `${LIB_EVENT_NAMESPACE}_update`

export function resetFight(this: void): undefined {
  if (data.inCombat !== true) {
    return undefined
  }

  reset = true

  finishFight(getCurrentFight())
  onFightUpdate()

  prepareFight(getCurrentFight())

  onCombatState(EVENT_PLAYER_COMBAT_STATE, IsUnitInCombat("player"))
  return undefined
}

function onDuelEnd(): undefined {
  log("debug", LOG_LEVEL_DEBUG, "Exiting duel.")
  if (data.inCombat !== true) {
    return undefined
  }

  reset = true

  finishFight(getCurrentFight())
  onFightUpdate()
  return undefined
}

export function onDuelEndDelayed(this: void): undefined {
  zo_callLater(() => {
    onDuelEnd()
  }, 1)
  return undefined
}

export function onDuelStart(this: void): undefined {
  log("debug", LOG_LEVEL_DEBUG, "Entering duel.")
  const currentfight = getCurrentFight()
  if (currentfight.prepared === false) {
    prepareFight(currentfight)
  }
  return undefined
}

export function getCurrentFightCopy(): Fight | undefined {
  const currentfight = getCurrentFight()
  if (currentfight.dpsstart !== undefined) {
    return ZO_DeepTableCopy(currentfight)
  }
  return undefined
}

export function onBossesChanged(this: void): undefined {
  data.bossInfo = {}
  const bossdata = data.bossInfo
  const currentfight = getCurrentFight()

  for (let i = 1; i <= 12; i++) {
    const unitTag = ZO_CachedStrFormat("boss<<1>>", i)

    if (DoesUnitExist(unitTag)) {
      const name = GetUnitName(unitTag)

      bossdata[name] = i
      currentfight.bossfight = true
      if (currentfight.bossname === undefined && name !== "") {
        currentfight.bossname = name
      }
    } else if (i >= 2) {
      return undefined
    }
  }
  return undefined
}

export function onPortalWorld(this: void, _eventCode: number, changeType: number): undefined {
  setIsInPortalWorld(changeType === EFFECT_RESULT_GAINED)
  onBossesChanged()
  return undefined
}

export function onMageExplode(this: void): undefined {
  resetFight()
  return undefined
}

export function prepareFight(fight: Fight): undefined {
  const timems = GetGameTimeMilliseconds()

  if (fight.prepared !== true) {
    log("fight", LOG_LEVEL_DEBUG, "Prepare fight")

    fight.combatstart = timems
    fight.group = data.inGroup

    purgeEffectBuffer(timems)

    fight.date = GetTimeStamp()
    fight.time = GetTimeString()
    fight.zone = GetPlayerActiveZoneName()
    fight.subzone = GetPlayerActiveSubzoneName()
    const [zoneId] = GetUnitWorldPosition("player")
    fight.zoneId = zoneId
    fight.ESOversion = GetESOVersionString()
    fight.APIversion = GetAPIVersion()
    fight.account = data.accountname

    const charData: FightCharData = {
      name: data.playername,
      raceId: GetUnitRaceId("player"),
      gender: GetUnitGender("player"),
      classId: GetUnitClassId("player"),
      level: GetUnitLevel("player"),
      roleId: GetSelectedLFGRole(),
      CPtotal: GetUnitChampionPoints("player"),
      APHealth: GetAttributeSpentPoints(ATTRIBUTE_HEALTH),
      APMagicka: GetAttributeSpentPoints(ATTRIBUTE_MAGICKA),
      APStam: GetAttributeSpentPoints(ATTRIBUTE_STAMINA),
      Curse: GetPlayerCurseType(),
      SkillLines: {},
      skillBars: undefined,
      scribedSkills: undefined,
      passiveSkills: undefined,
      equip: undefined,
    }
    fight.charData = charData

    const subClassingLines = SKILLS_DATA_MANAGER.activeClassSkillLineDataList
    for (let i = 1; i <= 3; i++) {
      const lineData = subClassingLines !== undefined ? subClassingLines[i] : undefined
      if (lineData !== undefined) {
        charData.SkillLines[i] = lineData.id
      }
    }

    fight.CP = getCurrentCP()

    getPlayerBuffs(timems)
    getOtherBuffs(timems)

    const [health] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_HEALTH)
    data.resources[COMBAT_MECHANIC_FLAGS_HEALTH] = health
    const [magicka] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_MAGICKA)
    data.resources[COMBAT_MECHANIC_FLAGS_MAGICKA] = magicka
    const [stamina] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_STAMINA)
    data.resources[COMBAT_MECHANIC_FLAGS_STAMINA] = stamina
    const [ultimate] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_ULTIMATE)
    data.resources[COMBAT_MECHANIC_FLAGS_ULTIMATE] = ultimate

    data.backstabber = getCritBonusFromCP(fight.CP)

    fight.prepared = true

    fight.startBar = data.bar

    data.stats = {}
    data.advancedStats = {}
    initStatusEffectBonuses()

    getNewStats(fight, timems)

    data.scribedSkills = {}
    getCurrentSkillBars()

    setLastBossHealthValue(2)

    fight.isWipe = false
    clearLastQueuedAbilities()
    clearUsedCastTimeAbility()

    clearDamageShieldBuffer()

    onBossesChanged()
  }

  const onUpdate = () => {
    onFightUpdate()
  }
  const success = EVENT_MANAGER.RegisterForUpdate(updateRegistrationName, 500, onUpdate)
  if (!success) {
    zo_callLater(() => {
      EVENT_MANAGER.RegisterForUpdate(updateRegistrationName, 500, onUpdate)
    }, 1500)
  }
  return undefined
}

function getCurrentBossHP(): number {
  if (BOSS_BAR.control.IsHidden()) {
    return 0
  }

  let totalHealth = 0
  let totalMaxHealth = 0

  for (const [, bossEntry] of pairs(BOSS_BAR.bossHealthValues)) {
    totalHealth = totalHealth + bossEntry.health
    totalMaxHealth = totalMaxHealth + bossEntry.maxHealth
  }

  return totalHealth / totalMaxHealth
}

function isOngoingBossfight(): boolean {
  if (isInPortalWorld) {
    log("other", LOG_LEVEL_DEBUG, "Prevented combat reset because player is in Portal!")
    return true
  } else if (getCurrentBossHP() > 0 && getCurrentBossHP() < 1) {
    log("other", LOG_LEVEL_INFO, "Prevented combat reset because boss is still in fight!")
    return true
  } else {
    return false
  }
}

function resetBuffers(): undefined {
  clearIsProjectile()

  data.lastabilities = []
  clearUnitCaches()
  clearEffectBuffer()
  clearLastAbilityActivations()
  return undefined
}

export function onFightUpdate(this: void): undefined {
  onCombatState(EVENT_PLAYER_COMBAT_STATE, IsUnitInCombat("player"))

  const fight = getCurrentFight()

  if (
    reset === true ||
    (data.inCombat === false &&
      fight.combatend > 0 &&
      GetGameTimeMilliseconds() > fight.combatend + COMBAT_TIMEOUT)
  ) {
    reset = false
    printDamageStats(fight)

    log("fight", LOG_LEVEL_DEBUG, "resetting...")
    fight.grplog = []

    fireCombatEvent(LIBCOMBAT_EVENT_FIGHTSUMMARY, fight)
    EVENT_MANAGER.UnregisterForUpdate(updateRegistrationName)
    resetBuffers()
    setCurrentFight(createFight())
  } else if (data.inCombat === true) {
    updateStats(fight)
  }
  return undefined
}

export function onCombatState(this: void, _event: number, inCombat: boolean): undefined {
  if (inCombat !== data.inCombat) {
    const timems = GetGameTimeMilliseconds()
    const currentfight = getCurrentFight()

    if (inCombat) {
      data.inCombat = inCombat

      fireCombatEvent(LIBCOMBAT_EVENT_MESSAGES, timems, LIBCOMBAT_MESSAGE_COMBATSTART, 0)

      if (currentfight.combatend > 0 && timems > currentfight.combatend + COMBAT_TIMEOUT) {
        currentfight.combatend = -150
        log("fight", LOG_LEVEL_DEBUG, "'Re-entering combat.")
      } else {
        log("fight", LOG_LEVEL_DEBUG, "Entering combat.")
        prepareFight(currentfight)
      }
    } else {
      if (isOngoingBossfight()) {
        log("fight", LOG_LEVEL_DEBUG, "Failed: Leaving combat.")
        return undefined
      }

      data.inCombat = false
      log("fight", LOG_LEVEL_DEBUG, "Leaving combat.")
      if (currentfight.prepared === true && currentfight.combatend < 0) {
        finishFight(currentfight)
      }

      if (currentfight.charData === undefined) {
        return undefined
      }
      fireCombatEvent(LIBCOMBAT_EVENT_MESSAGES, timems, LIBCOMBAT_MESSAGE_COMBATEND, 0)
    }
  }
  return undefined
}
