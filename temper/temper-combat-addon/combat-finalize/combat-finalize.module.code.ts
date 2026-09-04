import { createBaseAbility } from "@akasha/temper-combat-addon/combat-categories"
import { LOG_LEVEL_WARNING, log } from "@akasha/temper-combat-addon/combat-core-log"
import type { CastEntry, CmxFight, StatData } from "@akasha/temper-combat-addon/combat-core-types"
import {
  IGNORED_ABILITY_TIMING,
  INCOMING_STAT_LIST,
  IS_MAGICKA_ABILITY,
  STAT_LIST_TABLE,
  STATTYPE_CRITICAL,
  STATTYPE_CRITICALBONUS,
  STATTYPE_INCSPELL,
  STATTYPE_INCWEAPON,
  STATTYPE_PENETRATION,
} from "@akasha/temper-combat-addon/combat-data-tables"
import { getCalculated, getCurrentBar } from "@akasha/temper-combat-addon/combat-fight-model"
import { LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE } from "@akasha/temper-combat-addon/combat-lib-constants"

const inf = math.huge

function isMagickaDamageType(damageType: number | string): boolean | undefined {
  return typeof damageType === "number" ? IS_MAGICKA_ABILITY[damageType] : undefined
}

export function finalizeResourceStats(fight: CmxFight): undefined {
  const resources = getCalculated(fight).resources
  for (const [, resource] of pairs(resources)) {
    for (const [, ability] of pairs(resource.gains ?? {})) {
      resource.totalgains = ability.value + resource.totalgains
      ability.rate = ability.value / fight.combattime
    }

    for (const [, ability] of pairs(resource.drains ?? {})) {
      resource.totaldrains = ability.value + resource.totaldrains
      ability.rate = ability.value / fight.combattime
    }

    resource.gainRate = resource.totalgains / fight.combattime
    resource.drainRate = resource.totaldrains / fight.combattime
  }
  return undefined
}

export function finalizeStats(fight: CmxFight): undefined {
  const calcData = getCalculated(fight)
  const stats = calcData.stats

  const damageOut = calcData.damageOut

  const damageOutSpells = createBaseAbility("damageOut")
  calcData.damageOutSpells = damageOutSpells

  const damageOutWeapon = createBaseAbility("damageOut")
  calcData.damageOutWeapon = damageOutWeapon

  for (const [, ability] of pairs(damageOut)) {
    const isMagic = isMagickaDamageType(ability.damageType)
    if (isMagic !== undefined) {
      const datatable = isMagic ? damageOutSpells : damageOutWeapon

      for (const [key, value] of pairs(datatable)) {
        const abilityValue = ability[key] ?? 0
        if (key === "min") {
          datatable[key] = math.min(abilityValue, value)
        } else if (key === "max") {
          datatable[key] = math.max(abilityValue, value)
        } else {
          datatable[key] = abilityValue + value
        }
      }
    }
  }

  if (damageOutSpells.min === inf) {
    damageOutSpells.min = 0
  }
  if (damageOutWeapon.min === inf) {
    damageOutWeapon.min = 0
  }

  const damageIn = calcData.damageIn

  let damageInSpells = 0
  let damageInWeapon = 0

  for (const [, ability] of pairs(damageIn)) {
    const isMagic = isMagickaDamageType(ability.damageType)

    if (isMagic === true) {
      damageInSpells = damageInSpells + (ability.damageInTotal ?? 0)
    } else if (isMagic === false) {
      damageInWeapon = damageInWeapon + (ability.damageInTotal ?? 0)
    }
  }

  calcData.damageInSpells = damageInSpells
  calcData.damageInWeapon = damageInWeapon

  for (const [key, list] of pairs(STAT_LIST_TABLE)) {
    for (const [statId, stattype] of pairs(list)) {
      const damagevalues = key === "Spell" ? damageOutSpells : damageOutWeapon
      const statdata = stats[statId]

      if (statdata !== undefined) {
        let dmgValue = statdata.max
        let healValue = statdata.max
        let totaldmgvalue = zo_max(damagevalues.damageOutTotal ?? 0, 1)
        let totalhealvalue = zo_max(calcData.healingOutTotal ?? 0, 1)

        if (stattype === STATTYPE_CRITICAL) {
          const critablehits =
            (damagevalues.hitsOutNormal ?? 0) + (damagevalues.hitsOutCritical ?? 0)
          totaldmgvalue = zo_max(critablehits, 1)
          totalhealvalue = zo_max(calcData.healsOutTotal ?? 0, 1)
        } else if (stattype === STATTYPE_CRITICALBONUS) {
          totaldmgvalue = zo_max(damagevalues.damageOutCritical ?? 0, 1)
          totalhealvalue = zo_max(calcData.healingOutCritical ?? 0, 1)
        }

        if (statId === LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE) {
          totaldmgvalue = zo_max(calcData.damageOutTotal ?? 0, 1)
        }

        dmgValue = statdata.dmgsum / totaldmgvalue
        statdata.dmgavg = dmgValue

        if (stattype !== STATTYPE_PENETRATION) {
          healValue = statdata.healsum / totalhealvalue
        }
        if (statdata.min === inf) {
          statdata.min = 0
        }
        statdata.healavg = healValue
      }
    }
  }

  for (const [statId, stattype] of pairs(INCOMING_STAT_LIST)) {
    const statdata: StatData | undefined = stats[statId]
    if (statdata === undefined) {
      error("incoming stat data missing during finalization")
    }
    let totaldmgvalue = zo_max(calcData.damageInTotal ?? 0, 1)

    if (stattype === STATTYPE_CRITICALBONUS) {
      totaldmgvalue = zo_max(calcData.damageInCritical ?? 0, 1)
    } else if (stattype === STATTYPE_INCSPELL) {
      totaldmgvalue = zo_max(damageInSpells, 1)
    } else if (stattype === STATTYPE_INCWEAPON) {
      totaldmgvalue = zo_max(damageInWeapon, 1)
    }

    statdata.dmgavg = statdata.dmgsum / totaldmgvalue
  }
  return undefined
}

export function finalizeSkillTimings(fight: CmxFight): undefined {
  const calcData = getCalculated(fight)
  const skillData = calcData.skills
  const castData = calcData.casts
  if (castData === undefined) {
    error("cast data missing during finalization")
  }

  let lastValidSkill: number | undefined
  let lastValidWeaponAttack: number | undefined

  const charData = fight.charData
  const skillBars = charData !== undefined ? charData.skillBars : undefined
  if (skillBars === undefined) {
    error("skill bars missing during finalization")
  }

  for (let i = castData.length - 1; i >= 0; i--) {
    const cast: CastEntry | undefined = castData[i]
    if (cast === undefined) {
      continue
    }
    const reducedslot: number = cast[0]
    const registered = cast[1]
    const queued = cast[2]
    const startTime = cast[3]
    let endTime = cast[4]

    const skill = skillData[reducedslot]
    if (skill === undefined) {
      error("skill cast data missing during finalization")
    }
    const bar = zo_floor(reducedslot / 10) + 1
    const barSkills: Record<number, number> | undefined = skillBars[bar]
    const skillId = barSkills !== undefined ? barSkills[reducedslot % 10] : undefined

    if (startTime != null && !(skillId != null && IGNORED_ABILITY_TIMING[skillId] === true)) {
      const isWeaponAttack = reducedslot % 10 === 1 || reducedslot % 10 === 2
      const delay = startTime - (queued ?? registered)
      endTime =
        isWeaponAttack === false
          ? zo_max(startTime + 1000, endTime ?? 0)
          : (endTime ?? startTime + 1000)

      skill.delaySum = skill.delaySum + delay
      skill.delayCount = skill.delayCount + 1

      if (lastValidSkill != null) {
        const lastValidCast = castData[lastValidSkill]
        const lastValidStart = lastValidCast !== undefined ? lastValidCast[3] : undefined
        if (lastValidStart != null) {
          const weavingTime = lastValidStart - endTime
          skill.weavingTimeSum = skill.weavingTimeSum + weavingTime
          skill.weavingTimeCount = skill.weavingTimeCount + 1
        }
      }

      if (isWeaponAttack) {
        if (lastValidWeaponAttack != null && lastValidWeaponAttack - i === 1) {
          skill.weavingErrors = skill.weavingErrors + 1
        }
        lastValidWeaponAttack = i
      } else {
        if (lastValidSkill != null && lastValidSkill - i === 1) {
          skill.weavingErrors = skill.weavingErrors + 1
        }
        lastValidSkill = i
      }
    } else {
      table.remove(castData, i + 1)
      skill.failedCount = skill.failedCount + 1
      if (lastValidSkill != null) {
        lastValidSkill = lastValidSkill - 1
      }
      if (lastValidWeaponAttack != null) {
        lastValidWeaponAttack = lastValidWeaponAttack - 1
      }
    }
  }

  let totalWeavingTimeSum = 0
  let totalWeavingTimeCount = 0
  let totalWeaponAttacks = 0
  let totalSkillsFired = 0
  let totalDelay = 0
  let totalDelayCount = 0

  for (const [reducedslot, skill] of pairs(skillData)) {
    const isWeaponAttack = reducedslot % 10 === 1 || reducedslot % 10 === 2
    const timedata = skill.times
    const bar = zo_floor(reducedslot / 10) + 1
    const barSkills: Record<number, number> | undefined = skillBars[bar]
    const skillId = barSkills !== undefined ? barSkills[reducedslot % 10] : undefined
    const ignored = skillId != null && IGNORED_ABILITY_TIMING[skillId] === true

    if (ignored) {
      skill.ignored = true
    }
    if (skillId != null) {
      const count = timedata.length
      skill.count = count
      const delayCount = skill.delayCount
      const weavingTimeCount = skill.weavingTimeCount

      if (delayCount > 0) {
        skill.delayAvg = skill.delaySum / delayCount
      }
      if (weavingTimeCount > 0) {
        skill.weavingTimeAvg = skill.weavingTimeSum / weavingTimeCount
      }

      if (isWeaponAttack) {
        totalWeaponAttacks = totalWeaponAttacks + count
      } else if (!ignored) {
        totalSkillsFired = totalSkillsFired + count
        totalDelay = totalDelay + skill.delaySum
        totalDelayCount = totalDelayCount + delayCount
      }

      if (count > 1) {
        const firstTime = timedata[0]
        const lastTime = timedata[count - 1]
        if (firstTime != null && lastTime != null) {
          skill.diffTimeAvg = (lastTime - firstTime) / (count - 1)
        }
      }

      if (!(isWeaponAttack || ignored)) {
        totalWeavingTimeSum = totalWeavingTimeSum + skill.weavingTimeSum
        totalWeavingTimeCount = totalWeavingTimeCount + skill.weavingTimeCount
      }
    }

    skill.started = undefined
  }

  calcData.totalWeavingTimeSum = totalWeavingTimeSum
  calcData.totalWeavingTimeCount = totalWeavingTimeCount
  calcData.totalWeaponAttacks = totalWeaponAttacks
  calcData.totalSkillsFired = totalSkillsFired
  calcData.delayAvg = totalDelayCount > 0 ? totalDelay / totalDelayCount : 0

  calcData.casts = undefined
  calcData.lastIndex = undefined
  return undefined
}

export function finalizeBarData(fight: CmxFight): undefined {
  const barData = getCalculated(fight).barStats
  const currentBarStats = barData[getCurrentBar()]

  if (currentBarStats !== undefined && currentBarStats.offTimes !== undefined) {
    if (fight.dpsend != null) {
      table.insert(currentBarStats.offTimes, fight.dpsend)
    }
  }

  for (const [bar, barStats] of pairs(barData)) {
    let totalTime = 0
    const onTimes = barStats.onTimes ?? []
    const offTimes = barStats.offTimes ?? []

    if (onTimes.length === offTimes.length) {
      for (const [i, onTime] of ipairs(onTimes)) {
        const offTime = offTimes[i - 1]
        if (offTime != null) {
          totalTime = totalTime + offTime - onTime
        }
      }
      barStats.totalTime = totalTime / 1000
    } else {
      log("misc", LOG_LEVEL_WARNING, "Time Array lengths don't match for bar %d", bar)
    }

    barStats.onTimes = undefined
    barStats.offTimes = undefined
  }
  return undefined
}

export function finalizePerformanceData(fight: CmxFight): undefined {
  const performance = getCalculated(fight).performance
  const count = performance.count

  if (count > 0) {
    performance.avgMin = (performance.sumMin ?? 0) / count
    performance.avgMax = (performance.sumMax ?? 0) / count
    performance.avgAvg = (performance.sumAvg ?? 0) / count
    performance.avgPing = (performance.sumPing ?? 0) / count
  }
  return undefined
}
