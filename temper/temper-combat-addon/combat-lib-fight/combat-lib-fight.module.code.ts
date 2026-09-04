import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  COMBAT_TIMEOUT,
  LIB_EVENT_NAMESPACE,
  LIBCOMBAT_EVENT_FIGHTSUMMARY,
  LIBCOMBAT_EVENT_MESSAGES,
  LIBCOMBAT_MESSAGE_COMBATEND,
  LIBCOMBAT_MESSAGE_COMBATSTART,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  getOtherBuffs,
  getPlayerBuffs,
  purgeEffectBuffer,
} from "@akasha/temper-combat-addon/combat-lib-effects-buffer"
import { createFight, finishFight } from "@akasha/temper-combat-addon/combat-lib-fight-lifecycle"
import {
  getCritBonusFromCP,
  getCurrentCP,
  printDamageStats,
  updateStats,
} from "@akasha/temper-combat-addon/combat-lib-fight-stats"
import { LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, log } from "@akasha/temper-combat-addon/combat-lib-log"
import { getCurrentSkillBars } from "@akasha/temper-combat-addon/combat-lib-skill-bars"
import {
  clearDamageShieldBuffer,
  clearEffectBuffer,
  clearIsProjectile,
  clearLastAbilityActivations,
  clearLastQueuedAbilities,
  clearUsedCastTimeAbility,
  DATA,
  getCurrentFight,
  IS_IN_PORTAL_WORLD,
  setCurrentFight,
  setIsInPortalWorld,
  setLastBossHealthValue,
} from "@akasha/temper-combat-addon/combat-lib-state"
import { getNewStats } from "@akasha/temper-combat-addon/combat-lib-stats"
import { initStatusEffectBonuses } from "@akasha/temper-combat-addon/combat-lib-stats-boss"
import type { Fight, FightCharData } from "@akasha/temper-combat-addon/combat-lib-types"
import { clearUnitCaches } from "@akasha/temper-combat-addon/combat-lib-unit-cache"

let RESET = false

const updateRegistrationName = `${LIB_EVENT_NAMESPACE}_update`

export function resetFight(this: void): undefined {
  if (DATA.inCombat !== true) {
    return undefined
  }

  RESET = true

  finishFight(getCurrentFight())
  onFightUpdate()

  prepareFight(getCurrentFight())

  onCombatState(EVENT_PLAYER_COMBAT_STATE, IsUnitInCombat("player"))
  return undefined
}

function onDuelEnd(): undefined {
  log("debug", LOG_LEVEL_DEBUG, "Exiting duel.")
  if (DATA.inCombat !== true) {
    return undefined
  }

  RESET = true

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
  DATA.bossInfo = {}
  const bossdata = DATA.bossInfo
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
    fight.group = DATA.inGroup

    purgeEffectBuffer(timems)

    fight.date = GetTimeStamp()
    fight.time = GetTimeString()
    fight.zone = GetPlayerActiveZoneName()
    fight.subzone = GetPlayerActiveSubzoneName()
    const [zoneId] = GetUnitWorldPosition("player")
    fight.zoneId = zoneId
    fight.ESOversion = GetESOVersionString()
    fight.APIversion = GetAPIVersion()
    fight.account = DATA.accountname

    const charData: FightCharData = {
      name: DATA.playername,
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
    DATA.resources[COMBAT_MECHANIC_FLAGS_HEALTH] = health
    const [magicka] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_MAGICKA)
    DATA.resources[COMBAT_MECHANIC_FLAGS_MAGICKA] = magicka
    const [stamina] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_STAMINA)
    DATA.resources[COMBAT_MECHANIC_FLAGS_STAMINA] = stamina
    const [ultimate] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_ULTIMATE)
    DATA.resources[COMBAT_MECHANIC_FLAGS_ULTIMATE] = ultimate

    DATA.backstabber = getCritBonusFromCP(fight.CP)

    fight.prepared = true

    fight.startBar = DATA.bar

    DATA.stats = {}
    DATA.advancedStats = {}
    initStatusEffectBonuses()

    getNewStats(fight, timems)

    DATA.scribedSkills = {}
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
  if (IS_IN_PORTAL_WORLD) {
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

  DATA.lastabilities = []
  clearUnitCaches()
  clearEffectBuffer()
  clearLastAbilityActivations()
  return undefined
}

export function onFightUpdate(this: void): undefined {
  onCombatState(EVENT_PLAYER_COMBAT_STATE, IsUnitInCombat("player"))

  const fight = getCurrentFight()

  if (
    RESET === true ||
    (DATA.inCombat === false &&
      fight.combatend > 0 &&
      GetGameTimeMilliseconds() > fight.combatend + COMBAT_TIMEOUT)
  ) {
    RESET = false
    printDamageStats(fight)

    log("fight", LOG_LEVEL_DEBUG, "resetting...")
    fight.grplog = []

    fireCombatEvent(LIBCOMBAT_EVENT_FIGHTSUMMARY, fight)
    EVENT_MANAGER.UnregisterForUpdate(updateRegistrationName)
    resetBuffers()
    setCurrentFight(createFight())
  } else if (DATA.inCombat === true) {
    updateStats(fight)
  }
  return undefined
}

export function onCombatState(this: void, _event: number, inCombat: boolean): undefined {
  if (inCombat !== DATA.inCombat) {
    const timems = GetGameTimeMilliseconds()
    const currentfight = getCurrentFight()

    if (inCombat) {
      DATA.inCombat = inCombat

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

      DATA.inCombat = false
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
