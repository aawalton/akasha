import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  ACTIVE_TIME_ON_HEALS,
  LIBCOMBAT_CPTYPE_PASSIVE,
  LIBCOMBAT_CPTYPE_SLOTTED,
  LIBCOMBAT_CPTYPE_UNSLOTTED,
  LIBCOMBAT_EVENT_DAMAGE_IN,
  LIBCOMBAT_EVENT_DAMAGE_OUT,
  LIBCOMBAT_EVENT_FIGHTRECAP,
  LIBCOMBAT_EVENT_GROUPRECAP,
  LIBCOMBAT_EVENT_HEAL_IN,
  LIBCOMBAT_EVENT_HEAL_OUT,
  LIBCOMBAT_EVENT_HEAL_SELF,
  LIBCOMBAT_EVENT_UNITS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-lib-log"
import { DATA, EVENT_GROUP_ACTIVE } from "@akasha/temper-combat-addon/combat-lib-state"
import type {
  CPData,
  CPDisciplineData,
  Fight,
  FightRecapData,
  GroupRecapData,
} from "@akasha/temper-combat-addon/combat-lib-types"
import { processDeathRecaps } from "@akasha/temper-combat-addon/combat-lib-unit-cache"

export function getCritBonusFromCP(cpData: CPData): number {
  const greenDiscipline = cpData[1]
  if (greenDiscipline === undefined) {
    error("lib-combat: CP data is missing discipline 1")
  }
  const slots = greenDiscipline.slotted
  const points = greenDiscipline.stars

  const backstabber =
    slots[31] === true && points[31] !== undefined ? 2 * math.floor(0.1 * points[31][0]) : 0

  return backstabber
}

export function getCurrentCP(): CPData {
  const cp: CPData = { version: 2 }

  const slotsById: Record<number, number> = {}
  for (let slotIndex = 1; slotIndex <= 12; slotIndex++) {
    const starId = GetSlotBoundId(slotIndex, HOTBAR_CATEGORY_CHAMPION)
    if (starId > 0) {
      slotsById[starId] = slotIndex
    }
  }

  const disciplines = CHAMPION_DATA_MANAGER.disciplineDatas

  for (const [, discipline] of pairs(disciplines)) {
    const disciplineId = discipline.disciplineId
    const stars = discipline.championSkillDatas

    const disciplineData: CPDisciplineData = {
      total: discipline.GetNumSavedSpentPoints(),
      stars: {},
      slotted: {},
    }
    cp[disciplineId] = disciplineData

    const discStarData = disciplineData.stars
    const discSlotData = disciplineData.slotted

    for (const [, star] of pairs(stars)) {
      const savedPoints = star.GetNumSavedPoints()

      if (savedPoints > 0) {
        const starId = star.championSkillId

        const slotable = star.IsTypeSlottable()
        const slotted = slotsById[starId] !== undefined

        const starType = slotted
          ? LIBCOMBAT_CPTYPE_SLOTTED
          : slotable
            ? LIBCOMBAT_CPTYPE_UNSLOTTED
            : LIBCOMBAT_CPTYPE_PASSIVE

        discStarData[starId] = [savedPoints, starType]
        if (slotted) {
          discSlotData[starId] = true
        }
      }
    }
  }

  return cp
}

export function addCombatEvent(
  fight: Fight,
  timems: number,
  _result: number,
  targetUnitId: number,
  value: number,
  eventid: number,
  overflow: number
): undefined {
  if (eventid === LIBCOMBAT_EVENT_DAMAGE_OUT) {
    fight.damageOutTotal = fight.damageOutTotal + value + overflow
    const unit = fight.units[targetUnitId]
    if (unit === undefined) {
      error(`lib-combat: damage event for unknown unit ${targetUnitId}`)
    }
    unit.damageOutTotal = unit.damageOutTotal + value + overflow
    if (fight.dpsstart === undefined) {
      fight.dpsstart = timems
    }
    fight.dpsend = timems
  } else if (eventid === LIBCOMBAT_EVENT_DAMAGE_IN) {
    fight.damageInShielded = fight.damageInShielded + overflow
    fight.damageInTotal = fight.damageInTotal + value
  } else if (eventid === LIBCOMBAT_EVENT_HEAL_OUT) {
    fight.healingOutTotal = fight.healingOutTotal + value
    fight.healingOutAbsolute = fight.healingOutAbsolute + value + overflow

    if (ACTIVE_TIME_ON_HEALS) {
      if (fight.hpsstart === undefined) {
        fight.hpsstart = timems
      }
      fight.hpsend = timems
    }
  } else if (eventid === LIBCOMBAT_EVENT_HEAL_IN) {
    fight.healingInTotal = fight.healingInTotal + value
  } else if (eventid === LIBCOMBAT_EVENT_HEAL_SELF) {
    fight.healingInTotal = fight.healingInTotal + value
    fight.healingOutTotal = fight.healingOutTotal + value
    fight.healingOutAbsolute = fight.healingOutAbsolute + value + overflow

    if (ACTIVE_TIME_ON_HEALS) {
      if (fight.hpsstart === undefined) {
        fight.hpsstart = timems
      }
      fight.hpsend = timems
    }
  }
  return undefined
}

function getBossTargetDamage(fight: Fight): LuaMultiReturn<[number, number, number] | [undefined]> {
  if (fight.bossfight !== true) {
    return $multi(undefined)
  }

  let totalBossDamage = 0
  let totalBossGroupDamage = 0
  let starttime: number | undefined
  let endtime = 0

  for (const [, unit] of pairs(fight.units)) {
    const totalUnitDamage = unit.damageOutTotal
    if (unit.bossId !== undefined && totalUnitDamage > 0) {
      totalBossDamage = totalBossDamage + totalUnitDamage
      totalBossGroupDamage = totalBossGroupDamage + unit.groupDamageOut

      if (starttime === undefined) {
        starttime = unit.dpsstart
      } else if (unit.dpsstart !== undefined) {
        starttime = math.min(starttime, unit.dpsstart)
      }

      endtime = math.max(endtime, unit.dpsend ?? 0)
    }
  }

  let bossTime: number
  if (starttime !== undefined && starttime !== endtime) {
    bossTime = (endtime - starttime) / 1000
  } else {
    bossTime = fight.dpstime
  }

  return $multi(bossTime, totalBossDamage, totalBossGroupDamage)
}

function getSingleTargetDamage(fight: Fight): LuaMultiReturn<[number, number, number, boolean]> {
  if (fight.bossfight === true) {
    const [bossTime, totalBossDamage, totalBossGroupDamage] = getBossTargetDamage(fight)
    if (
      bossTime !== undefined &&
      totalBossDamage !== undefined &&
      totalBossGroupDamage !== undefined &&
      (totalBossDamage > 0 || totalBossGroupDamage > 0)
    ) {
      return $multi(bossTime, totalBossDamage, totalBossGroupDamage, true)
    }
  }

  let damage = 0
  let groupDamage = 0
  let unittime = 0
  for (const [, unit] of pairs(fight.units)) {
    const totalUnitDamage = unit.damageOutTotal
    if (totalUnitDamage > 0 && unit.isFriendly === false) {
      if (totalUnitDamage > damage) {
        damage = totalUnitDamage
        groupDamage = unit.groupDamageOut
        unittime =
          unit.dpsend !== undefined && unit.dpsstart !== undefined ? unit.dpsend - unit.dpsstart : 0
      }
    }
  }

  unittime = unittime > 0 ? unittime / 1000 : fight.dpstime
  return $multi(unittime, damage, groupDamage, false)
}

export function updateStats(fight: Fight): undefined {
  processDeathRecaps()

  if (
    (fight.dpsend === undefined && fight.hpsend === undefined) ||
    (fight.dpsstart === undefined && fight.hpsstart === undefined)
  ) {
    return undefined
  }

  const dpstime = zo_max(((fight.dpsend ?? 1) - (fight.dpsstart ?? 0)) / 1000, 1)
  const hpstime = zo_max(((fight.hpsend ?? 1) - (fight.hpsstart ?? 0)) / 1000, 1)

  fight.dpstime = dpstime
  fight.hpstime = hpstime

  updateGrpStats(fight)
  const [bossTime, totalBossDamage, totalBossGroupDamage, isBossFight] =
    getSingleTargetDamage(fight)

  fight.DPSOut = zo_floor(fight.damageOutTotal / dpstime + 0.5)
  fight.HPSOut = zo_floor(fight.healingOutTotal / hpstime + 0.5)
  fight.HPSAOut = zo_floor(fight.healingOutAbsolute / hpstime + 0.5)
  fight.DPSIn = zo_floor(fight.damageInTotal / dpstime + 0.5)
  fight.HPSIn = zo_floor(fight.healingInTotal / hpstime + 0.5)
  const bossDPSOut = zo_floor(totalBossDamage / bossTime + 0.5)

  const recap: FightRecapData = {
    DPSOut: fight.DPSOut,
    DPSIn: fight.DPSIn,
    HPSOut: fight.HPSOut,
    OHPSOut: fight.HPSAOut,
    HPSAOut: fight.HPSAOut,
    HPSIn: fight.HPSIn,
    overHealingOutTotal: fight.healingOutAbsolute,
    healingOutTotal: fight.healingOutTotal,
    damageOutTotal: fight.damageOutTotal,
    dpstime: dpstime,
    hpstime: hpstime,
    group: fight.group,
    groupDPSOut: fight.DPSOut,
    groupDPSIn: fight.DPSIn,
    groupHPSOut: fight.HPSOut,
    damageOutTotalGroup: fight.damageOutTotal,
    bossfight: isBossFight,
    bossFight: isBossFight,
    bossDPSOut: bossDPSOut,
    bossDamageTotal: totalBossDamage,
    bossDPSOutGroup: bossDPSOut,
    bossDamageTotalGroup: totalBossDamage,
    bossTime: bossTime,
  }

  if (fight.group && EVENT_GROUP_ACTIVE["CombatGrp"] === true) {
    recap.groupDPSOut = fight.groupDPSOut
    recap.groupDPSIn = fight.groupDPSIn
    recap.groupHPSOut = fight.groupHPSOut
    recap.damageOutTotalGroup = fight.groupDamageOut
    recap.bossDamageTotalGroup = totalBossGroupDamage
    recap.bossDPSOutGroup = zo_floor(totalBossGroupDamage / bossTime + 0.5)
  }

  fireCombatEvent(LIBCOMBAT_EVENT_UNITS, fight.units)
  fireCombatEvent(LIBCOMBAT_EVENT_FIGHTRECAP, recap)
  return undefined
}

function updateGrpStats(fight: Fight): undefined {
  if (!(fight.group && EVENT_GROUP_ACTIVE["CombatGrp"] === true)) {
    return undefined
  }

  const iend = fight.grplog.length
  if (iend > 1) {
    for (let i = iend; i >= 1; i--) {
      const line = fight.grplog[i - 1]
      if (line === undefined) {
        error("lib-combat: group log entry missing")
      }
      const [unitId, value, action] = line

      const unit = fight.units[unitId]

      if (unit !== undefined && unit.isFriendly === false && action === "heal") {
        table.remove(fight.grplog, i)
      } else if (unit !== undefined && unit.isFriendly === true && action === "heal") {
        fight.groupHealingOut = fight.groupHealingOut + value
        table.remove(fight.grplog, i)
      } else if (unit !== undefined && unit.isFriendly === false && action === "dmg") {
        unit.groupDamageOut = unit.groupDamageOut + value
        fight.groupDamageOut = fight.groupDamageOut + value
        table.remove(fight.grplog, i)
      } else if (unit !== undefined && unit.isFriendly === true && action === "dmg") {
        fight.groupDamageIn = fight.groupDamageIn + value
        table.remove(fight.grplog, i)
      }
    }
  }

  const dpstime = fight.dpstime
  const hpstime = fight.hpstime

  fight.groupHealingIn = fight.groupHealingOut

  fight.groupDPSOut = zo_floor(fight.groupDamageOut / dpstime + 0.5)
  fight.groupDPSIn = zo_floor(fight.groupDamageIn / dpstime + 0.5)
  fight.groupHPSOut = zo_floor(fight.groupHealingOut / hpstime + 0.5)

  fight.groupHPSIn = fight.groupHPSOut

  const recap: GroupRecapData = {
    groupDPSOut: fight.groupDPSOut,
    groupDPSIn: fight.groupDPSIn,
    groupHPSOut: fight.groupHPSOut,
    dpstime: dpstime,
    hpstime: hpstime,
  }

  fireCombatEvent(LIBCOMBAT_EVENT_GROUPRECAP, recap)
  return undefined
}

export function printDamageStats(fight: Fight): undefined {
  updateStats(fight)

  if (fight.damageOutTotal > 0 || fight.healingOutTotal > 0 || fight.damageInTotal > 0) {
    log("fight", LOG_LEVEL_DEBUG, "Time: %.2fs (DPS) | %.2fs (HPS) ", fight.dpstime, fight.hpstime)
    log("fight", LOG_LEVEL_DEBUG, "Dmg: %d (DPS: %d)", fight.damageOutTotal, fight.DPSOut)
    log("fight", LOG_LEVEL_DEBUG, "Heal: %d (HPS: %d)", fight.healingOutTotal, fight.HPSOut)
    log(
      "fight",
      LOG_LEVEL_DEBUG,
      "IncDmg: %d (Shield: %d, IncDPS: %d)",
      fight.damageInTotal,
      fight.damageInShielded,
      fight.DPSIn
    )
    log("fight", LOG_LEVEL_DEBUG, "IncHeal: %d (IncHPS: %d)", fight.healingInTotal, fight.HPSIn)

    if (DATA.inGroup && EVENT_GROUP_ACTIVE["CombatGrp"] === true) {
      log("fight", LOG_LEVEL_DEBUG, "GrpDmg: %d (DPS: %d)", fight.groupDamageOut, fight.groupDPSOut)
      log(
        "fight",
        LOG_LEVEL_DEBUG,
        "GrpHeal: %d (HPS: %d)",
        fight.groupHealingOut,
        fight.groupHPSOut
      )
      log(
        "fight",
        LOG_LEVEL_DEBUG,
        "GrpIncDmg: %d (IncDPS: %d)",
        fight.groupDamageIn,
        fight.groupDPSIn
      )
    }
  }
  return undefined
}
