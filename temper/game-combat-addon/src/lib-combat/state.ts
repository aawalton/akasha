import type { DamageShieldEntry, EffectBufferEntry, SkillRegistrationData } from "./message-types"
import type { Fight, LibCombatData } from "./types"

export const data: LibCombatData = {
  skillBars: {},
  scribedSkills: {},
  inCombat: false,
  inGroup: false,
  rawPlayername: "",
  playername: "",
  accountname: "",
  playerid: undefined,
  bossInfo: {},
  groupInfo: { nameToId: {}, tagToId: {}, nameToTag: {}, nameToDisplayname: {} },
  PlayerPets: {},
  lastabilities: [],
  backstabber: 0,
  critBonusMundus: 0,
  bar: 0,
  resources: {},
  stats: {},
  advancedStats: {},
  currentQuickslotIndex: 0,
  statusEffectBonus: undefined,
  isUIActivated: false,
  LoadCustomizations: undefined,
}

let currentfight: Fight | undefined

export function setCurrentFight(fight: Fight): undefined {
  currentfight = fight
  return undefined
}

export function getCurrentFight(): Fight {
  if (currentfight === undefined) {
    error("lib-combat: currentfight accessed before initialization")
  }
  return currentfight
}

export let effectBuffer: Record<number, Record<number, EffectBufferEntry>> = {}

export function clearEffectBuffer(): undefined {
  effectBuffer = {}
  return undefined
}

export let damageShieldBuffer: DamageShieldEntry[] = []

export function clearDamageShieldBuffer(): undefined {
  damageShieldBuffer = []
  return undefined
}

export let lastQueuedAbilities: Record<number, number> = {}

export function clearLastQueuedAbilities(): undefined {
  lastQueuedAbilities = {}
  return undefined
}

export let usedCastTimeAbility: Record<number, boolean> = {}

export function clearUsedCastTimeAbility(): undefined {
  usedCastTimeAbility = {}
  return undefined
}

export let lastAbilityActivations: Record<number, number> = {}

export function clearLastAbilityActivations(): undefined {
  lastAbilityActivations = {}
  return undefined
}

export let isProjectile: Record<number, boolean> = {}

export function clearIsProjectile(): undefined {
  isProjectile = {}
  return undefined
}

export let slotSkills: SkillRegistrationData[] = []

export function setSlotSkills(skills: SkillRegistrationData[]): undefined {
  slotSkills = skills
  return undefined
}

export let lastBossHealthValue = 2

export function setLastBossHealthValue(value: number): undefined {
  lastBossHealthValue = value
  return undefined
}

export const eventGroupActive: Record<string, boolean> = {}

export let isInPortalWorld = false

export function setIsInPortalWorld(value: boolean): undefined {
  isInPortalWorld = value
  return undefined
}
