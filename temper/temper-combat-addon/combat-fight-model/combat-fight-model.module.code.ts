import { createBaseAbility, createBasicValues } from "@akasha/temper-combat-addon/combat-categories"
import type {
  AbilityData,
  BarStats,
  CalculatedData,
  CmxFight,
  DamageCategory,
  EffectData,
  ResourceAbilityData,
  ResourceData,
  ResourceTable,
  SkillCastData,
  StatData,
  UnitCalc,
  UnitStatData,
} from "@akasha/temper-combat-addon/combat-core-types"
import { ABILITY_DELAY } from "@akasha/temper-combat-addon/combat-data-tables"
import { getFormattedAbilityName } from "@akasha/temper-combat-addon/combat-lib-constants"

const inf = math.huge

let CURRENT_BAR = 0

export function getCurrentBar(): number {
  return CURRENT_BAR
}

export function setCurrentBar(bar: number): undefined {
  CURRENT_BAR = bar
  return undefined
}

let ABILITY_DURATIONS: Record<number, number> = {}

export function getAbilityDuration(abilityId: number): number {
  if (ABILITY_DURATIONS[abilityId] == null) {
    const [, castTime] = GetAbilityCastInfo(abilityId, undefined, "player")

    let duration = castTime
    if (duration == null || duration === 0) {
      duration = 1000
    }

    ABILITY_DURATIONS[abilityId] = duration
  }

  return ABILITY_DURATIONS[abilityId] + (ABILITY_DELAY[abilityId] ?? 0)
}

export function getCalculated(fight: CmxFight): CalculatedData {
  const calculated = fight.calculated
  if (calculated === undefined) {
    error("fight analysis accessed without calculated data")
  }
  return calculated
}

function createUnitCalc(): UnitCalc {
  return {
    buffs: {},
    statData: {},
    ...createBasicValues(),
  }
}

function createAbilityData(
  abilityId: number,
  pet: boolean,
  damageType: number | string | undefined,
  tablekey: DamageCategory
): AbilityData {
  return {
    name: getFormattedAbilityName(abilityId),
    pet: pet,
    damageType: damageType ?? "",
    isheal: tablekey === "healingOut" || tablekey === "healingIn",
    ...createBaseAbility(tablekey),
  }
}

function createEffectData(effectType: number, name: string, abilityId: number): EffectData {
  return {
    name: name,
    iconId: abilityId,
    uptime: 0,
    count: 0,
    groupUptime: 0,
    groupCount: 0,
    effectType: effectType,
    maxStacks: 0,
    firstStartTime: undefined,
    firstGroupStartTime: undefined,
    slots: {},
    instances: {},
  }
}

export function checkInstance(
  effectdata: EffectData,
  abilityId: number,
  stacks: number
): undefined {
  const instances = effectdata.instances
  let instance = instances[abilityId]

  if (instance === undefined) {
    instance = {}
    instances[abilityId] = instance
  }

  const stackData = instance[stacks]

  if (stackData === undefined) {
    instance[stacks] = {
      uptime: 0,
      count: 0,
      groupUptime: 0,
      groupCount: 0,
    }
  }
  return undefined
}

function createResourceTable(): ResourceTable {
  return {
    [COMBAT_MECHANIC_FLAGS_MAGICKA]: {
      gains: {},
      drains: {},
      totalgains: 0,
      totaldrains: 0,
    },
    [COMBAT_MECHANIC_FLAGS_STAMINA]: {
      gains: {},
      drains: {},
      totalgains: 0,
      totaldrains: 0,
    },
    [COMBAT_MECHANIC_FLAGS_ULTIMATE]: {
      gains: {},
      totalgains: 0,
      totaldrains: 0,
    },
  }
}

function createSkillCastData(): SkillCastData {
  return {
    started: [],
    times: [],
    delaySum: 0,
    delayCount: 0,
    weavingTimeSum: 0,
    weavingTimeCount: 0,
    failedCount: 0,
    weavingErrors: 0,
  }
}

function createBarStats(): BarStats {
  return {
    onTimes: [],
    offTimes: [],
    damageOut: 0,
    damageIn: 0,
    healingOut: 0,
    healingIn: 0,
  }
}

function createStatData(): StatData {
  return { min: inf, max: 0, dmgsum: 0, healsum: 0 }
}

function createUnitStatData(): UnitStatData {
  return { value: 0, debuffs: {} }
}

export function acquireUnitData(fight: CmxFight, unitId: number, timems: number): UnitCalc {
  const units = getCalculated(fight).units

  let unit = units[unitId]

  if (unit === undefined) {
    unit = createUnitCalc()
    units[unitId] = unit

    unit.starttime = timems
    unit.unitId = unitId
  }

  unit.endtime = timems

  return unit
}

export function acquireAbilityData(
  unit: UnitCalc,
  abilityId: number,
  ispet: boolean,
  damageType: number | string | undefined,
  tableKey: DamageCategory
): AbilityData {
  const data = unit[tableKey]

  if (data[abilityId] === undefined) {
    data[abilityId] = createAbilityData(abilityId, ispet, damageType, tableKey)
  }

  return data[abilityId]
}

export function acquireEffectData(
  unit: UnitCalc,
  abilityId: number,
  effectType: number,
  stacks: number
): EffectData {
  const name = getFormattedAbilityName(abilityId)

  const buffs = unit.buffs

  if (buffs[name] === undefined) {
    buffs[name] = createEffectData(effectType, name, abilityId)
  }

  const buffdata = buffs[name]

  checkInstance(buffdata, abilityId, stacks)

  buffdata.maxStacks = zo_max(stacks, buffdata.maxStacks)

  return buffs[name]
}

export function acquireResourceData(
  fight: CmxFight,
  abilityId: number,
  powerValueChange: number,
  powerType: number
): ResourceData | ResourceAbilityData {
  const tablekey = powerValueChange >= 0 ? "gains" : "drains"
  const resource = getCalculated(fight).resources[powerType]
  if (resource === undefined) {
    error("resource table missing for power type")
  }

  if (powerType === COMBAT_MECHANIC_FLAGS_ULTIMATE) {
    return resource
  }
  const abilities = resource[tablekey]
  if (abilities === undefined) {
    error("resource ability table missing for power type")
  }
  if (abilities[abilityId] === undefined) {
    abilities[abilityId] = { ticks: 0, value: 0 }
  }

  return abilities[abilityId]
}

export function acquireSkillCastData(fight: CmxFight, reducedslot: number): SkillCastData {
  const skilldata = getCalculated(fight).skills

  if (skilldata[reducedslot] === undefined) {
    skilldata[reducedslot] = createSkillCastData()
  }

  return skilldata[reducedslot]
}

export function acquireBarStats(fight: CmxFight, bar: number): BarStats {
  const bardata = getCalculated(fight).barStats

  if (bardata[bar] === undefined) {
    bardata[bar] = createBarStats()
  }

  return bardata[bar]
}

export function acquireStatData(fight: CmxFight, statId: number): StatData {
  const statData = getCalculated(fight).stats

  if (statData[statId] === undefined) {
    statData[statId] = createStatData()
  }

  return statData[statId]
}

export function acquireUnitStatData(unit: UnitCalc, statId: number): UnitStatData {
  const statData = unit.statData

  if (statData[statId] === undefined) {
    statData[statId] = createUnitStatData()
  }

  return statData[statId]
}

export function getEmptyFightStats(): CalculatedData {
  const data: CalculatedData = {
    temp: { stats: {} },
    units: {},
    stats: {},

    resources: createResourceTable(),
    skills: {},
    casts: [],
    lastIndex: {},
    barStats: {},

    totalWeavingTimeSum: 0,
    totalWeavingTimeCount: 0,
    totalWeaponAttacks: 0,
    totalSkillsFired: 0,

    performance: { count: 0 },
    buildInfo: { mundus: {}, drinkFood: {}, potions: {} },

    graph: {
      damageOut: {},
      damageIn: {},
      healingOut: {},
      healingIn: {},
    },

    buffVersion: 2,
    calcVersion: 2,

    ...createBasicValues(),
  }

  ABILITY_DURATIONS = {}

  return data
}
