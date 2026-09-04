import { LOG_LEVEL_WARNING, log } from "@akasha/temper-combat-addon/combat-core-log"
import type {
  CastEntry,
  CmxFight,
  CoreLogLine,
} from "@akasha/temper-combat-addon/combat-core-types"
import { ABILITY_DELAY, CHANGING_ABILITIES } from "@akasha/temper-combat-addon/combat-data-tables"
import {
  acquireBarStats,
  acquireSkillCastData,
  getAbilityDuration,
  getCalculated,
  getCurrentBar,
  setCurrentBar,
} from "@akasha/temper-combat-addon/combat-fight-model"
import {
  getFormattedAbilityName,
  LIBCOMBAT_MESSAGE_WEAPONSWAP,
  LIBCOMBAT_SKILLSTATUS_BEGIN_CHANNEL,
  LIBCOMBAT_SKILLSTATUS_BEGIN_DURATION,
  LIBCOMBAT_SKILLSTATUS_INSTANT,
  LIBCOMBAT_SKILLSTATUS_QUEUE,
  LIBCOMBAT_SKILLSTATUS_REGISTERED,
  LIBCOMBAT_SKILLSTATUS_SUCCESS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  isMessagesLogLine,
  isPerformanceLogLine,
  isQuickslotLogLine,
  isSkillTimingsLogLine,
} from "@akasha/temper-combat-addon/combat-lib-log-lines"

export function processLogSkillTimings(fight: CmxFight, logline: CoreLogLine): undefined {
  if (!isSkillTimingsLogLine(logline)) {
    return undefined
  }
  const timems = logline[1]
  const reducedslot = logline[2]
  const abilityId = logline[3]
  const status = logline[4]

  const skill = acquireSkillCastData(fight, reducedslot)

  const calculated = getCalculated(fight)
  const castData = calculated.casts
  const indexData = calculated.lastIndex
  const started = skill.started
  if (castData === undefined || indexData === undefined || started === undefined) {
    error("skill cast bookkeeping missing during log processing")
  }
  let lastRegisteredIndex = indexData[abilityId]

  if (status === LIBCOMBAT_SKILLSTATUS_REGISTERED) {
    const newCast: CastEntry = [reducedslot, timems]

    const index = castData.length

    castData[index] = newCast
    indexData[abilityId] = index
  } else if (status === LIBCOMBAT_SKILLSTATUS_QUEUE) {
    lastRegisteredIndex = lastRegisteredIndex ?? lookupChangedIndex(indexData, abilityId)

    if (lastRegisteredIndex == null) {
      return undefined
    }

    const cast = castData[lastRegisteredIndex]
    if (cast !== undefined) {
      cast[2] = timems
    }
  } else if (status === LIBCOMBAT_SKILLSTATUS_INSTANT) {
    lastRegisteredIndex = lastRegisteredIndex ?? lookupChangedIndex(indexData, abilityId)

    if (lastRegisteredIndex == null) {
      log(
        "calc",
        LOG_LEVEL_WARNING,
        "[%.3f s] Missing registered ability on instant event: %s (%d), Slot: %d",
        (timems - fight.combatstart) / 1000,
        getFormattedAbilityName(abilityId),
        abilityId,
        reducedslot
      )
      return undefined
    }
    const isWeaponAttack = reducedslot % 10 === 1 || reducedslot % 10 === 2
    const duration = isWeaponAttack ? 0 : 1000

    const cast = castData[lastRegisteredIndex]
    if (cast !== undefined) {
      cast[3] = timems
      cast[4] = timems + duration
    }
    table.insert(skill.times, timems)
    indexData[abilityId] = undefined
  } else if (
    status === LIBCOMBAT_SKILLSTATUS_BEGIN_DURATION ||
    status === LIBCOMBAT_SKILLSTATUS_BEGIN_CHANNEL
  ) {
    lastRegisteredIndex = lastRegisteredIndex ?? lookupChangedIndex(indexData, abilityId)

    if (lastRegisteredIndex == null) {
      log(
        "calc",
        LOG_LEVEL_WARNING,
        "[%.3f s] Missing registered ability on start event: %s (%d), Slot: %d",
        (timems - fight.combatstart) / 1000,
        getFormattedAbilityName(abilityId),
        abilityId,
        reducedslot
      )
      return undefined
    }
    const cast = castData[lastRegisteredIndex]
    if (cast !== undefined) {
      cast[3] = timems
      cast[4] = timems + getAbilityDuration(abilityId) + (ABILITY_DELAY[abilityId] ?? 0)
    }
    table.insert(skill.times, timems)
    table.insert(started, lastRegisteredIndex)
    indexData[abilityId] = undefined
  } else if (status === LIBCOMBAT_SKILLSTATUS_SUCCESS) {
    let indexFound: number | undefined

    for (const [k, castindex] of ipairs(started)) {
      const cast = castData[castindex]
      const starttime = cast !== undefined ? cast[3] : undefined
      if (cast === undefined || starttime == null) {
        continue
      }
      const timeDiff = timems - starttime

      if (timeDiff < getAbilityDuration(abilityId) + 250) {
        cast[4] = zo_max(timems, starttime + 1000)
        indexFound = k

        table.remove(started, k)

        break
      }
    }

    if (indexFound == null) {
      log(
        "calc",
        LOG_LEVEL_WARNING,
        "[%.3f s] Missing started ability on success event: %s (%d), Slot: %d",
        (timems - fight.combatstart) / 1000,
        getFormattedAbilityName(abilityId),
        abilityId,
        reducedslot
      )
      return undefined
    }
    if (indexFound > 3) {
      log(
        "calc",
        LOG_LEVEL_WARNING,
        "[%.3f s] Large number of unfinished skills (%d): %s (%d), Slot: %d",
        indexFound,
        (timems - fight.combatstart) / 1000,
        getFormattedAbilityName(abilityId),
        abilityId,
        reducedslot
      )
    }
  }
  return undefined
}

function lookupChangedIndex(
  indexData: Record<number, number | undefined>,
  abilityId: number
): number | undefined {
  const changedId = CHANGING_ABILITIES[abilityId]
  return changedId !== undefined ? indexData[changedId] : undefined
}

export function processMessages(fight: CmxFight, logline: CoreLogLine): undefined {
  if (!isMessagesLogLine(logline)) {
    return undefined
  }
  const timems = logline[1]
  const messageId = logline[2]
  const value = logline[3]

  if (messageId !== LIBCOMBAT_MESSAGE_WEAPONSWAP) {
    return undefined
  }

  const barStatsOld = acquireBarStats(fight, getCurrentBar())

  const offTimes = barStatsOld.offTimes
  if (offTimes !== undefined) {
    table.insert(offTimes, timems)
  }

  setCurrentBar(value)

  const barStatsNew = acquireBarStats(fight, getCurrentBar())

  const onTimes = barStatsNew.onTimes
  if (onTimes !== undefined) {
    table.insert(onTimes, timems)
  }
  return undefined
}

export function processBossHp(_fight: CmxFight, _logline: CoreLogLine): undefined {
  return undefined
}

export function processPerformanceStats(fight: CmxFight, logline: CoreLogLine): undefined {
  if (!isPerformanceLogLine(logline)) {
    return undefined
  }
  const avg: number | undefined = logline[2]
  const min: number | undefined = logline[3]
  const max: number | undefined = logline[4]
  const ping: number | undefined = logline[5]
  if (avg == null || min == null || max == null || ping == null) {
    return undefined
  }

  const performance = getCalculated(fight).performance
  performance.count = performance.count + 1

  performance.minMin = zo_min(performance.minMin ?? min, min)
  performance.maxMin = zo_max(performance.maxMin ?? min, min)
  performance.sumMin = min + (performance.sumMin ?? 0)

  performance.minMax = zo_min(performance.minMax ?? max, max)
  performance.maxMax = zo_max(performance.maxMax ?? max, max)
  performance.sumMax = max + (performance.sumMax ?? 0)

  performance.minAvg = zo_min(performance.minAvg ?? avg, avg)
  performance.maxAvg = zo_max(performance.maxAvg ?? avg, avg)
  performance.sumAvg = avg + (performance.sumAvg ?? 0)

  performance.minPing = zo_min(performance.minPing ?? ping, ping)
  performance.maxPing = zo_max(performance.maxPing ?? ping, ping)
  performance.sumPing = ping + (performance.sumPing ?? 0)
  return undefined
}

export function processQuickslotEvents(fight: CmxFight, logline: CoreLogLine): undefined {
  if (!isQuickslotLogLine(logline)) {
    return undefined
  }
  const itemLink: string | undefined = logline[2]

  if (itemLink == null) {
    return undefined
  }
  const [itemType] = GetItemLinkItemType(itemLink)
  if (itemType !== ITEMTYPE_POTION) {
    return undefined
  }

  const potions = getCalculated(fight).buildInfo.potions
  potions[itemLink] = (potions[itemLink] ?? 0) + 1
  return undefined
}
