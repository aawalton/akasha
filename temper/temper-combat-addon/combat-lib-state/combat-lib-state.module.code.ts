import type {
  DamageShieldEntry,
  EffectBufferEntry,
  SkillRegistrationData,
} from "@akasha/temper-combat-addon/combat-lib-message-types"
import type { Fight, LibCombatData } from "@akasha/temper-combat-addon/combat-lib-types"

export const DATA: LibCombatData = {
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

export let EFFECT_BUFFER: Record<number, Record<number, EffectBufferEntry>> = {}

export function clearEffectBuffer(): undefined {
  EFFECT_BUFFER = {}
  return undefined
}

export let DAMAGE_SHIELD_BUFFER: DamageShieldEntry[] = []

export function clearDamageShieldBuffer(): undefined {
  DAMAGE_SHIELD_BUFFER = []
  return undefined
}

export let LAST_QUEUED_ABILITIES: Record<number, number> = {}

export function clearLastQueuedAbilities(): undefined {
  LAST_QUEUED_ABILITIES = {}
  return undefined
}

export let USED_CAST_TIME_ABILITY: Record<number, boolean> = {}

export function clearUsedCastTimeAbility(): undefined {
  USED_CAST_TIME_ABILITY = {}
  return undefined
}

export let LAST_ABILITY_ACTIVATIONS: Record<number, number> = {}

export function clearLastAbilityActivations(): undefined {
  LAST_ABILITY_ACTIVATIONS = {}
  return undefined
}

export let IS_PROJECTILE: Record<number, boolean> = {}

export function clearIsProjectile(): undefined {
  IS_PROJECTILE = {}
  return undefined
}

export let SLOT_SKILLS: SkillRegistrationData[] = []

export function setSlotSkills(skills: SkillRegistrationData[]): undefined {
  SLOT_SKILLS = skills
  return undefined
}

export let LAST_BOSS_HEALTH_VALUE = 2

export function setLastBossHealthValue(value: number): undefined {
  LAST_BOSS_HEALTH_VALUE = value
  return undefined
}

export const EVENT_GROUP_ACTIVE: Record<string, boolean> = {}

export let IS_IN_PORTAL_WORLD = false

export function setIsInPortalWorld(value: boolean): undefined {
  IS_IN_PORTAL_WORLD = value
  return undefined
}
