import { COMBAT_MECHNIC_FLAG_TABLE_LOAD_LEGACY } from "@akasha/temper-combat-addon/combat-encoding-tables"
import type {
  CombatLogLine,
  Fight,
  FightUnit,
  LogFilters,
} from "@akasha/temper-combat-addon/combat-fight-data-types"
import {
  decodeCombatLogLine,
  encodeCombatLogLine,
  lineField,
} from "@akasha/temper-combat-addon/combat-log-line-codec"

export function convertCombatLog(
  savedFight: Fight,
  filters?: boolean | LogFilters
): string[] | undefined {
  const combatlog = savedFight.log

  if (filters === false || combatlog === undefined || combatlog.length === 0) {
    return undefined
  } else if (filters === undefined) {
    filters = true
  }

  const starttime = (savedFight.starttime ?? combatlog[0]?.[1] ?? 0) - 1000

  const stringlog: string[] = []
  let tempLog: string[] = []
  let currentsize = 0

  if (filters === true) {
    for (const line of combatlog) {
      line[1] = lineField(line, 1) - starttime
      const [logstring, size] = encodeCombatLogLine(line, savedFight)
      if (logstring !== undefined && size !== undefined) {
        tempLog.push(logstring)
        currentsize = currentsize + size
      }

      if (currentsize > 975) {
        const longstring = tempLog.join(",")
        stringlog.push(longstring)

        tempLog = []
        currentsize = 0
      }
    }
  } else if (typeof filters === "object") {
    for (const line of combatlog) {
      if (filters[lineField(line, 0)] === true) {
        line[1] = lineField(line, 1) - starttime
        const [logstring, size] = encodeCombatLogLine(line, savedFight)
        if (logstring !== undefined && size !== undefined) {
          tempLog.push(logstring)
          currentsize = currentsize + size
        }

        if (currentsize > 975) {
          const longstring = tempLog.join(",")
          stringlog.push(longstring)

          tempLog = []
          currentsize = 0
        }
      }
    }
  }

  if (currentsize > 0) {
    const longstring = tempLog.join(",")
    stringlog.push(longstring)
  }

  savedFight.log = undefined
  return stringlog
}

export function recoverCombatLog(loadedFight: Fight): undefined {
  const strings = loadedFight.stringlog
  const svversion = loadedFight.svversion
  if (svversion === undefined) {
    return error("loaded fight has no svversion")
  }
  let timeOffset = 0
  if (svversion >= 3) {
    timeOffset = 1000
  }
  if (svversion < 12 && loadedFight.APIversion === undefined) {
    if (loadedFight.ESOversion !== undefined) {
      const [, , esoMainVersion] = string.find(loadedFight.ESOversion, "eso%.%w+%.(%d+)")
      loadedFight.APIversion = (tonumber(esoMainVersion) ?? 0) + 101026
    } else {
      loadedFight.APIversion = 0
    }
  }

  if (GetAPIVersion() >= 101034 && (loadedFight.APIversion ?? 0) < 101034) {
    const oldResources = loadedFight.calculated.resources
    if (oldResources !== undefined) {
      let resources: Record<number, unknown> = {}
      for (const [oldkey, data] of pairs(oldResources)) {
        const newkey = COMBAT_MECHNIC_FLAG_TABLE_LOAD_LEGACY[oldkey]
        if (newkey === undefined) {
          resources = oldResources
          break
        }
        resources[newkey] = data
      }

      loadedFight.calculated.resources = resources
    }
  }

  if (strings === undefined || strings.length === 0) {
    return undefined
  }

  const combatlog: CombatLogLine[] = []
  const fightStart = loadedFight.starttime
  if (fightStart === undefined) {
    return error("loaded fight has no starttime")
  }
  const starttime = fightStart - timeOffset

  for (const data of strings) {
    for (const [linePart] of string.gmatch(data, "([^,]+)")) {
      if (linePart === undefined) continue
      const logline = decodeCombatLogLine(linePart, loadedFight)
      if (logline !== undefined) {
        const timems = lineField(logline, 1)
        if (timems < 16600000) {
          logline[1] = timems + starttime
        } else {
          logline[1] = timems + starttime - 16777216
        }
        combatlog.push(logline)
      }
    }
  }

  loadedFight.log = combatlog
  loadedFight.stringlog = undefined
  loadedFight.unitConversion = undefined
  return undefined
}

export function reduceUnitIds(fight: Fight): undefined {
  if (fight.units === undefined) {
    fight.units = {}
  }
  const newUnits: Record<number, FightUnit> = {}
  const newCalcUnits: Record<number, unknown> = {}
  const unitConversion: Record<number, number> = {}
  const calcData = fight.calculated
  const calcUnits = calcData.units
  let newId = 1

  for (const [id, unit] of pairs(fight.units)) {
    unit.zenEffectSlot = undefined
    unit.stacksOfZen = undefined
    unit.forceOfNature = undefined
    unit.forceOfNatureStacks = undefined

    newUnits[newId] = unit
    newCalcUnits[newId] = calcUnits[id]
    unitConversion[id] = newId

    if (unit.unitType === 1) {
      fight.playerid = newId
    }
    newId = newId + 1
  }

  if (fight.bosses === undefined) {
    fight.bosses = {}
  }
  const bosses = fight.bosses
  for (const [bossid, unitId] of pairs(bosses)) {
    bosses[bossid] = unitConversion[unitId]
  }

  fight.units = newUnits
  fight.unitConversion = unitConversion
  calcData.units = newCalcUnits
  return undefined
}
