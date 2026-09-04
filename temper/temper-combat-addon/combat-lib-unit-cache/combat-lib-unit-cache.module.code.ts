import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  DEATH_RECAP_TIME_PERIOD,
  LIB_DEBUG,
  LIBCOMBAT_EVENT_DEATHRECAP,
  MAX_UNIT_CACHE_EVENTS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-lib-log"
import { getCurrentFight } from "@akasha/temper-combat-addon/combat-lib-state"
import type { DeathRecapLogLine, UnitCache } from "@akasha/temper-combat-addon/combat-lib-types"
import { getUnitInfo } from "@akasha/temper-combat-addon/combat-lib-units"

const COMBAT_EVENT_CACHE: Record<number, UnitCache> = {}

let UNIT_DEATHS_TO_PROCESS: Record<number, UnitCache> = {}

export function createUnitCache(unitId: number): UnitCache {
  const cache: UnitCache = {
    unitId: unitId,
    nextKey: 0,
    maxlength: MAX_UNIT_CACHE_EVENTS,
    cache: [],
    timems: undefined,
    health: undefined,
    healthMax: undefined,
    magicka: undefined,
    magickaMax: undefined,
    stamina: undefined,
    staminaMax: undefined,
    log: undefined,
    name: undefined,
    displayname: undefined,
    unitTag: undefined,
    unitType: undefined,
    bossname: undefined,
    zoneId: undefined,
    fighttime: undefined,
    combatstart: undefined,
  }

  COMBAT_EVENT_CACHE[unitId] = cache

  if (LIB_DEBUG) {
    const fightUnit = getCurrentFight().units[unitId]
    const unitname = fightUnit !== undefined ? fightUnit.name : "Unknown"
    log("debug", LOG_LEVEL_DEBUG, "Init UnitCache: %s (%d)", unitname, unitId)
  }

  return cache
}

export function onUnitCacheDeath(cache: UnitCache, timems: number): undefined {
  cache.timems = timems

  UNIT_DEATHS_TO_PROCESS[cache.unitId] = cache

  if (LIB_DEBUG) {
    const fightUnit = getCurrentFight().units[cache.unitId]
    const unitname = fightUnit !== undefined ? fightUnit.name : "Unknown"
    log("debug", LOG_LEVEL_DEBUG, "UnitCacheHandler:OnDeath: %s (%d)", unitname, cache.unitId)
  }
  return undefined
}

export function processDeath(cache: UnitCache): undefined {
  const currentfight = getCurrentFight()
  const unit = currentfight.units[cache.unitId]

  if (unit !== undefined) {
    ZO_ShallowTableCopy(getUnitInfo(unit), cache)
  }

  cache.bossname = currentfight.bossname
  cache.zoneId = currentfight.zoneId
  cache.fighttime = currentfight.date
  cache.combatstart = currentfight.combatstart

  cache.log = []
  const ring = cache.cache

  if (
    ring !== undefined &&
    ring.length > 0 &&
    cache.nextKey !== undefined &&
    cache.timems !== undefined
  ) {
    const logLines = cache.log
    const offset = cache.nextKey
    const length = ring.length
    const timems = cache.timems

    let deleted = 0

    log(
      "debug",
      LOG_LEVEL_DEBUG,
      "Processing death event cache. Offset: %d, length:%d",
      offset,
      length
    )

    for (let i = 0; i <= length - 1; i++) {
      const cachekey = (i + offset) % length
      const line = ring[cachekey]
      if (line === undefined) {
        error("lib-combat: death recap cache entry missing")
      }

      if (timems - line[0] < DEATH_RECAP_TIME_PERIOD) {
        logLines[logLines.length] = line
        const sourceUnitId = line[2]
        const sourceUnit =
          typeof sourceUnitId === "number" && sourceUnitId > 0
            ? currentfight.units[sourceUnitId]
            : undefined

        line[2] = sourceUnit !== undefined ? sourceUnit.name : "Unknown"

        const magicka = line[9]
        if (
          magicka !== undefined &&
          (cache.magickaMax === undefined || magicka > cache.magickaMax)
        ) {
          cache.magickaMax = magicka
        }
        const stamina = line[10]
        if (
          stamina !== undefined &&
          (cache.staminaMax === undefined || stamina > cache.staminaMax)
        ) {
          cache.staminaMax = stamina
        }
      } else {
        deleted = deleted + 1
      }
    }

    log(
      "debug",
      LOG_LEVEL_DEBUG,
      "%s: cache: %d, log: %d, deleted: %d",
      unit !== undefined ? unit.name : "Unknown",
      length,
      logLines.length,
      deleted
    )
  }

  cache.cache = undefined
  cache.health = undefined
  cache.stamina = undefined
  cache.magicka = undefined
  cache.nextKey = undefined
  cache.maxlength = undefined

  fireCombatEvent(LIBCOMBAT_EVENT_DEATHRECAP, cache.timems, cache)

  createUnitCache(cache.unitId)
  delete UNIT_DEATHS_TO_PROCESS[cache.unitId]
  return undefined
}

export function addUnitCacheEvent(
  cache: UnitCache,
  timems: number,
  result: number,
  sourceUnitId: number,
  abilityId: number,
  hitValue: number,
  damageType: number,
  overflow: number
): undefined {
  if (cache.health === undefined) {
    initUnitCacheResources(cache)
  }

  const nextKey = cache.nextKey
  const ring = cache.cache
  const maxlength = cache.maxlength
  if (nextKey === undefined || ring === undefined || maxlength === undefined) {
    return undefined
  }

  const line: DeathRecapLogLine = [
    timems,
    result,
    sourceUnitId,
    abilityId,
    damageType,
    hitValue,
    overflow,
    cache.health,
    cache.healthMax,
    cache.magicka,
    cache.stamina,
  ]
  ring[nextKey] = line

  cache.nextKey = (nextKey + 1) % maxlength

  cache.timems = timems
  return undefined
}

export function initUnitCacheResources(cache: UnitCache): undefined {
  const unit = getCurrentFight().units[cache.unitId]

  if (unit !== undefined) {
    const unitTag = unit.unitTag
    if (unitTag !== undefined) {
      const [health, healthMax] = GetUnitPower(unitTag, COMBAT_MECHANIC_FLAGS_HEALTH)
      cache.health = health
      cache.healthMax = healthMax

      if (unitTag === "player") {
        const [magicka] = GetUnitPower(unitTag, COMBAT_MECHANIC_FLAGS_MAGICKA)
        cache.magicka = magicka
        const [stamina] = GetUnitPower(unitTag, COMBAT_MECHANIC_FLAGS_STAMINA)
        cache.stamina = stamina
      }
    }
  }
  return undefined
}

export function updateUnitCacheResource(
  cache: UnitCache,
  powerType: number,
  value: number,
  powerMax: number
): undefined {
  if (powerType === COMBAT_MECHANIC_FLAGS_HEALTH) {
    cache.health = value
    cache.healthMax = powerMax > 0 ? powerMax : (cache.healthMax ?? 0)
  } else if (powerType === COMBAT_MECHANIC_FLAGS_STAMINA) {
    cache.stamina = value
    cache.staminaMax = powerMax > 0 ? powerMax : (cache.staminaMax ?? 0)
  } else if (powerType === COMBAT_MECHANIC_FLAGS_MAGICKA) {
    cache.magicka = value
    cache.magickaMax = powerMax > 0 ? powerMax : (cache.magickaMax ?? 0)
  }
  return undefined
}

export function getUnitCache(unitId: number | undefined): UnitCache | undefined {
  if (unitId === undefined || unitId < 1) {
    return undefined
  }
  let unitCache = COMBAT_EVENT_CACHE[unitId]
  if (unitCache === undefined) {
    unitCache = createUnitCache(unitId)
  }

  return unitCache
}

export function processDeathRecaps(): undefined {
  const timems = GetGameTimeMilliseconds()
  for (const [unitId, unitCache] of pairs(UNIT_DEATHS_TO_PROCESS)) {
    if (unitCache.timems !== undefined && timems - unitCache.timems > 200) {
      log(
        "debug",
        LOG_LEVEL_DEBUG,
        "ProcessDeath: %s (%d)",
        getCurrentFight().units[unitId]?.name ?? "Unknown",
        unitId
      )
      processDeath(unitCache)
    }
  }
  return undefined
}

export function clearUnitCaches(): undefined {
  log("debug", LOG_LEVEL_DEBUG, "ClearUnitCaches (%d)", NonContiguousCount(COMBAT_EVENT_CACHE))

  for (const [unitId] of pairs(COMBAT_EVENT_CACHE)) {
    delete COMBAT_EVENT_CACHE[unitId]
  }

  UNIT_DEATHS_TO_PROCESS = {}
  return undefined
}
