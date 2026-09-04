import type { CompanionId } from "@akasha/temper-companions-core/companions"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { RaceId } from "@akasha/temper-races/races"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"

export interface CompletionCharacter {
  id: string
  name: string
  classId: ClassId
  raceId: RaceId
  level: number
  maxLevel: number
  allianceRank: number
  maxAllianceRank: number
}

export interface CharacterMountTrainingProgress {
  characterId: string
  speed: number
  maxSpeed: number
  stamina: number
  maxStamina: number
  carryCapacity: number
  maxCarryCapacity: number
}

export interface CharacterPackUpgradesProgress {
  characterId: string
  packUpgrades: number
  maxPackUpgrades: number
}

export interface SkillLineProgressEntry {
  skillLineId: SkillLineId
  percent: number
  currentRank: number
  currentXP: number
  nextRankXP: number
  maxRank: number
}

export interface CharacterSkillLineProgress {
  characterId: string
  entries: readonly SkillLineProgressEntry[]
}

export interface ScribingKnowledgeItem {
  name: string
  unlocked: boolean
}

export interface CharacterScribingProgress {
  characterId: string
  grimoires: readonly ScribingKnowledgeItem[]
  focusScripts: readonly ScribingKnowledgeItem[]
  signatureScripts: readonly ScribingKnowledgeItem[]
  affixScripts: readonly ScribingKnowledgeItem[]
}

export interface RecipeDetail {
  itemId: number
  name: string
  known: boolean
}

export interface RecipeListProgressEntry {
  listIndex: number
  name: string
  knownCount: number
  totalCount: number
  percent: number
  recipes: readonly RecipeDetail[]
}

export interface CharacterRecipeProgress {
  characterId: string
  entries: readonly RecipeListProgressEntry[]
}

export interface QuestZoneProgress {
  zoneName: string
  quests: readonly { questId: number; name: string; completed: boolean }[]
}

export interface CharacterQuestProgress {
  characterId: string
  zones: readonly QuestZoneProgress[]
  completedCount: number
  totalCount: number
}

export interface ZoneActivityProgress {
  activityIndex: number
  name: string
  completed: boolean
}

export interface ZoneCompletionTypeProgress {
  completionType: number
  label: string
  activities: readonly ZoneActivityProgress[]
  completedCount: number
  totalCount: number
}

export interface ZoneCompletionZoneProgress {
  zoneId: number
  name: string
  completionTypes: readonly ZoneCompletionTypeProgress[]
  completedCount: number
  totalCount: number
}

export interface CharacterZoneCompletionProgress {
  characterId: string
  zones: readonly ZoneCompletionZoneProgress[]
  completedCount: number
  totalCount: number
}

export interface PoiActivityProgress {
  poiIndex: number
  name: string
  discovered: boolean
}

export interface PoiTypeProgress {
  poiType: number
  label: string
  pois: readonly PoiActivityProgress[]
  discoveredCount: number
  totalCount: number
}

export interface PoiZoneProgress {
  zoneId: number
  name: string
  poiTypes: readonly PoiTypeProgress[]
  discoveredCount: number
  totalCount: number
}

export interface CharacterPoiProgress {
  characterId: string
  zones: readonly PoiZoneProgress[]
  discoveredCount: number
  totalCount: number
}

interface LoreBookProgress {
  bookIndex: number
  name: string
  known: boolean
}

interface LoreCollectionProgress {
  collectionIndex: number
  name: string
  knownCount: number
  totalBooks: number
  books: readonly LoreBookProgress[]
}

export interface LoreCategoryProgress {
  categoryIndex: number
  name: string
  collections: readonly LoreCollectionProgress[]
  knownCount: number
  totalBooks: number
}

export interface AccountLoreProgress {
  categories: readonly LoreCategoryProgress[]
  knownCount: number
  totalBooks: number
}

export interface CharacterLoreLibraryProgress {
  characterId: string
  categories: readonly LoreCategoryProgress[]
  knownCount: number
  totalBooks: number
}

interface AntiquityLoreEntry {
  antiquityId: number
  name: string
  setId: number
  loreEntriesAcquired: number
  totalLoreEntries: number
}

export interface AntiquityLoreCategoryProgress {
  categoryId: number
  name: string
  antiquities: readonly AntiquityLoreEntry[]
  acquiredCount: number
  totalCount: number
}

export interface AccountAntiquityLoreProgress {
  categories: readonly AntiquityLoreCategoryProgress[]
  acquiredCount: number
  totalCount: number
}

export interface TraitResearchTraitEntry {
  traitIndex: number
  name: string
  known: boolean
}

export interface TraitResearchLineEntry {
  researchLineIndex: number
  name: string
  knownCount: number
  totalCount: number
  traits: readonly TraitResearchTraitEntry[]
}

export interface TraitResearchCraftTypeProgress {
  craftingType: number
  name: string
  lines: readonly TraitResearchLineEntry[]
  knownCount: number
  totalCount: number
}

export interface CharacterTraitResearchProgress {
  characterId: string
  craftTypes: readonly TraitResearchCraftTypeProgress[]
  knownCount: number
  totalCount: number
}

export interface SkillPointSourceProgress {
  key: string
  label: string
  count: number
  total: number
}

export interface CharacterSkillPointsProgress {
  characterId: string
  general: readonly SkillPointSourceProgress[]
  skyshards: readonly SkillPointSourceProgress[]
  zoneQuests: readonly SkillPointSourceProgress[]
  groupDungeons: readonly SkillPointSourceProgress[]
  publicDungeons: readonly SkillPointSourceProgress[]
  completedCount: number
  totalCount: number
}

export interface CharacterDailyWritsProgress {
  characterId: string
  completed: number
  total: 7
  date: string | null
}

interface CharacterCompanionRapportEntry {
  companionId: CompanionId
  rapport: number
  name: string
}

export interface CharacterCompanionRapportProgress {
  characterId: string
  entries: readonly CharacterCompanionRapportEntry[]
  completedCount: number
  totalCount: number
}

export interface CollectibleSubCategoryProgress {
  name: string
  collectibles: readonly { id: number; name: string; unlocked: boolean }[]
  unlockedCount: number
  totalCount: number
}

export interface CollectibleCategoryProgress {
  categoryIndex: number
  name: string
  subCategories: readonly CollectibleSubCategoryProgress[]
  unlockedCount: number
  totalCount: number
}

export interface AccountCollectiblesProgress {
  categories: readonly CollectibleCategoryProgress[]
  unlockedCount: number
  totalCount: number
}

export interface CompanionProgressEntry {
  companionId: CompanionId
  name: string
  level?: number
  maxLevel: number
  rapport: number
}

export interface CompanionSkillLineProgressEntry {
  skillLineId: SkillLineId
  name: string
  currentRank: number
  maxRank: number
}

export interface CompanionSkillLineProgress {
  companionId: CompanionId
  name: string
  entries: readonly CompanionSkillLineProgressEntry[]
}

interface CadwellPOIEntry {
  poiIndex: number
  name: string
  completed: boolean
}

export interface CadwellZoneEntry {
  zoneIndex: number
  name: string
  pois: readonly CadwellPOIEntry[]
}

export interface CadwellLevelEntry {
  level: number
  label: string
  zones: readonly CadwellZoneEntry[]
}

export interface CharacterCadwellProgress {
  characterId: string
  levels: readonly CadwellLevelEntry[]
  completedCount: number
  totalCount: number
}

export interface TributeCardUpgradeProgress {
  cardIndex: number
  baseCardName: string
  upgradeCardName: string
  upgraded: boolean
}

export interface TributePatronProgress {
  patronId: number
  name: string
  collectibleId: number
  unlocked: boolean
  cards: readonly TributeCardUpgradeProgress[]
  upgradedCount: number
  totalCount: number
}

export interface AccountTributeProgress {
  patrons: readonly TributePatronProgress[]
  completedCount: number
  totalCount: number
}
