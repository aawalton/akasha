import type { BuildHash } from "@akasha/temper-formula-framework/branded-id"

export interface AchievementCriteriaProgress {
  completedSteps: number
  totalSteps: number
  criteria?: Record<string, { numCompleted: number; numRequired: number }>
}

export interface AccountAchievementProgress {
  completed: boolean
  completionDate?: number
  criteriaProgress: AchievementCriteriaProgress
}

export interface CharacterAchievementProgress {
  completed: boolean
  completionDate?: number
  criteriaProgress: AchievementCriteriaProgress
}

export interface SkillMorphVariant {
  name: string
  rank: number | undefined
}

export interface SkillMorphData {
  base: SkillMorphVariant
  morph1: SkillMorphVariant
  morph2: SkillMorphVariant
  currentMorph: number
  abilityIndex: number
  isUltimate?: boolean
  atMorph?: boolean
}

export interface SkillLineProgress {
  currentRank: number
  currentXP: number
  nextRankXP: number
  skills?: Record<number, SkillMorphData>
}

interface LoreBook {
  name: string
  known: boolean
}

interface LoreCollection {
  name: string
  books: Record<number, LoreBook>
}

export interface LoreCategory {
  name: string
  collections: Record<number, LoreCollection>
}

export type SparseLoreLibrary = Record<number, Record<number, number[]>>

interface Recipe {
  name: string
  known: boolean
  craftingType?: number
}

export interface RecipeList {
  name: string
  recipes: Record<number, Recipe>
}

export type SparseRecipes = Record<number, number[]>

export interface GrimoireEntry {
  name: string
  unlocked: boolean
}

export interface ScriptEntry {
  name: string
  slot: number
  unlocked: boolean
}

export interface ScribingProgress {
  grimoires: Record<number, GrimoireEntry>
  scripts: Record<number, ScriptEntry>
}

export interface SkillPointProgress {
  total: number
  unassigned: number
  level: number
  mainQuests: number
  tutorial: number
  foliumDiscognitum: number
  pvpRank: number
  maelstromArena: number
  endlessArchive: number
  skyshardPoints: number
  totalSkyshards: number
  zoneQuestTotal: number
  groupDungeonTotal: number
  publicDungeonTotal: number
  skyshards: Record<string, number>
  zoneQuests: Record<string, number>
  groupDungeons: Record<string, number>
  publicDungeons: Record<string, number>
}

export interface ItemSetPieceProgress {
  name: string
  unlocked: boolean
}

interface ItemSetProgress {
  name: string
  categoryName?: string
  subcategoryName?: string
  slotsUnlocked: number
  totalSlots: number
  pieces?: readonly ItemSetPieceProgress[]
}

export interface AntiquityLoreProgress {
  name: string
  categoryId: number
  categoryName: string
  setId: number
  loreEntriesAcquired: number
  totalLoreEntries: number
}

export type SparseAntiquityLore = Record<number, number>

export type SparseZoneCompletion = Record<number, Record<number, number[]>>

export type SparsePoiDiscovery = Record<number, number[]>

export interface TraitResearchTrait {
  name: string
  known: boolean
}

export interface TraitResearchLine {
  name: string
  traits: Record<number, TraitResearchTrait>
}

export interface TraitResearchCraftType {
  name: string
  lines: Record<number, TraitResearchLine>
}

export interface MountTrainingProgress {
  speed: number
  maxSpeed: number
  stamina: number
  maxStamina: number
  carryCapacity: number
  maxCarryCapacity: number
}

export interface CadwellPOI {
  name: string
  openingText: string
  closingText: string
  order: number
  discovered: boolean
  completed: boolean
}

export interface CadwellZone {
  name: string
  description: string
  order: number
  pois: Record<number, CadwellPOI>
}

export interface CadwellLevel {
  zones: Record<number, CadwellZone>
}

export interface CadwellProgress {
  progressionLevel: number
  levels: Record<number, CadwellLevel>
}

export const TOTAL_GRAND_MASTER_STATIONS = 83

export interface AccountCompletion {
  achievements: Record<number, AccountAchievementProgress>
  itemSets?: Record<number, ItemSetProgress>
  antiquityLore?: Record<number, AntiquityLoreProgress> | SparseAntiquityLore
  championPointsEarned?: number
  collectibles?: readonly number[]
  subclassingSkillLineProgress?: Record<number, SkillLineProgress>

  tributeCardUpgrades?: Record<number, number[]>
  bankUpgrade?: { current: number; max: number }
  grandMasterStations?: Record<number, { name: string; unlocked: number[] }>
}

export interface CharacterCompletion {
  buildHash?: BuildHash
  gender?: number
  level?: number
  classId?: number
  allianceId?: number
  raceId?: number
  curseState?: string
  className?: string
  classIcon?: string
  achievements?: Record<number, CharacterAchievementProgress>
  skillLineProgress?: Record<number, SkillLineProgress>
  loreLibrary?: Record<number, LoreCategory> | SparseLoreLibrary
  motifKnowledge?: Readonly<Record<number, readonly number[]>>
  recipes?: Record<number, RecipeList> | SparseRecipes
  scribing?: ScribingProgress
  skillPoints?: SkillPointProgress
  traitResearch?: Record<number, TraitResearchCraftType>
  companionRapport?: Record<number, number>
  quests?: readonly number[] | Record<string, number>
  cadwell?: CadwellProgress
  zoneCompletion?: SparseZoneCompletion
  pointsOfInterest?: SparsePoiDiscovery
  mountTraining?: MountTrainingProgress
  bagSize?: number
  allianceRank?: number
  dailyWrits?: {
    date: string
    completed: number
  }
}

export interface CompanionCompletion {
  build?: Record<string, unknown>
  selectedBuild?: string
  targetBuildHash?: BuildHash
  level?: number
  currentXP?: number
  rapport?: number
  skillLineProgress?: Record<number, SkillLineProgress>
}
