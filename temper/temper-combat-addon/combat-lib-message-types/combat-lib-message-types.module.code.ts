import type {
  Fight,
  FightRecapData,
  GroupRecapData,
  UnitCache,
  UnitEntry,
} from "@akasha/temper-combat-addon/combat-lib-types"

export type CombatEventCallback = (this: void, eventId: number, ...args: never[]) => void

export type UnitsPayload = [units: Record<number, UnitEntry>]
export type FightRecapPayload = [data: FightRecapData]
export type FightSummaryPayload = [fight: Fight]
export type GroupRecapPayload = [data: GroupRecapData]
export type CombatLogPayload = [
  timems: number,
  result: number,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number,
  hitValue: number,
  damageType: number,
  overflow: number,
]
export type EffectLogPayload = [
  timems: number,
  unitId: number,
  abilityId: number,
  changeType: number,
  effectType: number,
  stacks: number,
  sourceType: number,
  effectSlot: number,
]
export type PlayerStatsPayload = [
  timems: number,
  statchange: number,
  newvalue: number,
  statId: number,
]
export type ResourcesPayload = [
  timems: number,
  abilityId: number,
  powerValueChange: number,
  powerType: number,
  powerValue: number,
]
export type MessagesPayload = [timems: number, combatMessage: number, value: number]
export type DeathPayload = [timems: number, state: number, unitId: number, otherId?: number]
export type SkillTimingsPayload = [
  timems: number,
  reducedslot: number | undefined,
  abilityId: number,
  skillStatus: number,
  skillDelay?: number,
  skillDuration?: number,
]
export type BossHpPayload = [timems: number, bossId: number, currenthp: number, maxhp: number]
export type PerformancePayload = [
  timems: number,
  avg: number,
  min: number,
  max: number,
  ping: number,
]
export type DeathRecapPayload = [timems: number, data: UnitCache]
export type QuickslotPayload = [timems: number, itemLink: string]

export type BufferedEffectLogData = [
  eventId: number,
  timems: number,
  unitId: number,
  abilityId: number,
  changeType: number,
  effectType: number,
  stacks: number,
  sourceType: number,
  effectSlot: number,
]

export type EffectBufferEntry = [
  endTime: number,
  logdata: BufferedEffectLogData,
  abilityType: number,
]

export type DamageShieldEntry = [
  timems: number,
  sourceUnitId: number,
  targetUnitId: number,
  hitValue: number,
]

export type SkillRegistrationData = [
  convertedId: number,
  result: number | undefined,
  convertedId2?: number,
  result2?: number,
]

export type CombatEventHandler = (
  this: void,
  eventCode: number,
  result: number,
  isError: boolean,
  abilityName: string,
  abilityGraphic: number,
  abilityActionSlotType: number,
  sourceName: string,
  sourceType: number,
  targetName: string,
  targetType: number,
  hitValue: number,
  powerType: number,
  damageType: number,
  log: boolean,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number,
  overflow: number
) => void

export type EffectChangedHandler = (
  this: void,
  eventCode: number,
  changeType: number,
  effectSlot: number,
  effectName: string,
  unitTag: string,
  beginTime: number,
  endTime: number,
  stackCount: number,
  iconName: string,
  buffType: number,
  effectType: number,
  abilityType: number,
  statusEffectType: number,
  unitName: string,
  unitId: number,
  abilityId: number,
  sourceType: number
) => void

export type PowerUpdateHandler = (
  this: void,
  eventCode: number,
  unitTag: string,
  powerIndex: number,
  powerType: number,
  powerValue: number,
  powerMax: number,
  powerEffectiveMax: number
) => void
