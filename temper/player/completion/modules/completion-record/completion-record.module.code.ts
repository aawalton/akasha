import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { z } from "zod"

const numbers = luaArrayOrEmpty(z.number())

const countsById = z.record(z.number(), z.number())

const listsById = z.record(z.number(), numbers)

const listsByTwoIds = z.record(z.number(), listsById)

const buildHashSchema = z.string().transform(buildHash)

const achievementCriteriaProgressSchema = z.strictObject({
  completedSteps: z.number(),
  totalSteps: z.number(),
  criteria: z
    .record(z.string(), z.strictObject({ numCompleted: z.number(), numRequired: z.number() }))
    .optional(),
})

const achievementProgressSchema = z.strictObject({
  completed: z.boolean(),
  completionDate: z.number().optional(),
  criteriaProgress: achievementCriteriaProgressSchema,
})

const skillMorphVariantSchema = z.strictObject({
  name: z.string(),
  rank: z
    .number()
    .optional()
    .transform((rank): number | undefined => rank),
})

const skillMorphDataSchema = z.strictObject({
  base: skillMorphVariantSchema,
  morph1: skillMorphVariantSchema,
  morph2: skillMorphVariantSchema,
  currentMorph: z.number(),
  abilityIndex: z.number(),
  isUltimate: z.boolean().optional(),
  atMorph: z.boolean().optional(),
})

const skillLineProgressSchema = z.strictObject({
  currentRank: z.number(),
  currentXP: z.number(),
  nextRankXP: z.number(),
  skills: z.record(z.number(), skillMorphDataSchema).optional(),
})

const grimoireEntrySchema = z.strictObject({ name: z.string(), unlocked: z.boolean() })

const scriptEntrySchema = z.strictObject({
  name: z.string(),
  slot: z.number(),
  unlocked: z.boolean(),
})

const scribingProgressSchema = z.strictObject({
  grimoires: z.record(z.number(), grimoireEntrySchema),
  scripts: z.record(z.number(), scriptEntrySchema),
})

const skillPointProgressSchema = z.strictObject({
  total: z.number(),
  unassigned: z.number(),
  level: z.number(),
  mainQuests: z.number(),
  tutorial: z.number(),
  foliumDiscognitum: z.number(),
  pvpRank: z.number(),
  maelstromArena: z.number(),
  endlessArchive: z.number(),
  skyshardPoints: z.number(),
  totalSkyshards: z.number(),
  zoneQuestTotal: z.number(),
  groupDungeonTotal: z.number(),
  publicDungeonTotal: z.number(),
  skyshards: z.record(z.string(), z.number()),
  zoneQuests: z.record(z.string(), z.number()),
  groupDungeons: z.record(z.string(), z.number()),
  publicDungeons: z.record(z.string(), z.number()),
})

const itemSetPieceProgressSchema = z.strictObject({ name: z.string(), unlocked: z.boolean() })

const itemSetProgressSchema = z.strictObject({
  name: z.string(),
  categoryName: z.string().optional(),
  subcategoryName: z.string().optional(),
  slotsUnlocked: z.number(),
  totalSlots: z.number(),
  pieces: luaArrayOrEmpty(itemSetPieceProgressSchema).optional(),
})

const traitResearchTraitSchema = z.strictObject({ name: z.string(), known: z.boolean() })

const traitResearchLineSchema = z.strictObject({
  name: z.string(),
  traits: z.record(z.number(), traitResearchTraitSchema),
})

const traitResearchCraftTypeSchema = z.strictObject({
  name: z.string(),
  lines: z.record(z.number(), traitResearchLineSchema),
})

const mountTrainingProgressSchema = z.strictObject({
  speed: z.number(),
  maxSpeed: z.number(),
  stamina: z.number(),
  maxStamina: z.number(),
  carryCapacity: z.number(),
  maxCarryCapacity: z.number(),
})

const cadwellPoiSchema = z.strictObject({
  name: z.string(),
  openingText: z.string(),
  closingText: z.string(),
  order: z.number(),
  discovered: z.boolean(),
  completed: z.boolean(),
})

const cadwellZoneSchema = z.strictObject({
  name: z.string(),
  description: z.string(),
  order: z.number(),
  pois: z.record(z.number(), cadwellPoiSchema),
})

const cadwellLevelSchema = z.strictObject({ zones: z.record(z.number(), cadwellZoneSchema) })

const cadwellProgressSchema = z.strictObject({
  progressionLevel: z.number(),
  levels: z.record(z.number(), cadwellLevelSchema),
})

export const accountCompletionSchema = z.strictObject({
  achievements: z.record(z.number(), achievementProgressSchema),
  itemSets: z.record(z.number(), itemSetProgressSchema).optional(),
  antiquityLore: countsById.optional(),
  championPointsEarned: z.number().optional(),
  collectibles: numbers.optional(),
  subclassingSkillLineProgress: z.record(z.number(), skillLineProgressSchema).optional(),
  tributeCardUpgrades: listsById.optional(),
  bankUpgrade: z.strictObject({ current: z.number(), max: z.number() }).optional(),
  grandMasterStations: z
    .record(z.number(), z.strictObject({ name: z.string(), unlocked: numbers }))
    .optional(),
})

export const characterCompletionSchema = z.strictObject({
  buildHash: buildHashSchema.optional(),
  gender: z.number().optional(),
  level: z.number().optional(),
  classId: z.number().optional(),
  allianceId: z.number().optional(),
  raceId: z.number().optional(),
  curseState: z.string().optional(),
  className: z.string().optional(),
  classIcon: z.string().optional(),
  achievements: z.record(z.number(), achievementProgressSchema).optional(),
  skillLineProgress: z.record(z.number(), skillLineProgressSchema).optional(),
  loreLibrary: listsByTwoIds.optional(),
  motifKnowledge: listsById.optional(),
  recipes: listsById.optional(),
  scribing: scribingProgressSchema.optional(),
  skillPoints: skillPointProgressSchema.optional(),
  traitResearch: z.record(z.number(), traitResearchCraftTypeSchema).optional(),
  companionRapport: z.record(z.number(), z.number()).optional(),
  quests: numbers.optional(),
  cadwell: cadwellProgressSchema.optional(),
  zoneCompletion: listsByTwoIds.optional(),
  pointsOfInterest: listsById.optional(),
  mountTraining: mountTrainingProgressSchema.optional(),
  bagSize: z.number().optional(),
  allianceRank: z.number().optional(),
  dailyWrits: z.strictObject({ date: z.string(), completed: z.number() }).optional(),
  dailyWritStates: z
    .strictObject({ date: z.string(), seen: numbers, completed: numbers })
    .optional(),
})

export const companionCompletionSchema = z.strictObject({
  build: z.record(z.string(), z.unknown()).optional(),
  selectedBuild: z.string().optional(),
  targetBuildHash: buildHashSchema.optional(),
  level: z.number().optional(),
  currentXP: z.number().optional(),
  rapport: z.number().optional(),
  rapportLevel: z.number().optional(),
  skillLineProgress: z.record(z.number(), skillLineProgressSchema).optional(),
})

export type AchievementCriteriaProgress = z.infer<typeof achievementCriteriaProgressSchema>

export type AccountAchievementProgress = z.infer<typeof achievementProgressSchema>

export type CharacterAchievementProgress = z.infer<typeof achievementProgressSchema>

export type SkillLineProgress = z.infer<typeof skillLineProgressSchema>

export type GrimoireEntry = z.infer<typeof grimoireEntrySchema>

export type ScriptEntry = z.infer<typeof scriptEntrySchema>

export type ScribingProgress = z.infer<typeof scribingProgressSchema>

export type SkillPointProgress = z.infer<typeof skillPointProgressSchema>

export type ItemSetPieceProgress = z.infer<typeof itemSetPieceProgressSchema>

export type TraitResearchTrait = z.infer<typeof traitResearchTraitSchema>

export type TraitResearchLine = z.infer<typeof traitResearchLineSchema>

export type TraitResearchCraftType = z.infer<typeof traitResearchCraftTypeSchema>

export type MountTrainingProgress = z.infer<typeof mountTrainingProgressSchema>

export type CadwellPOI = z.infer<typeof cadwellPoiSchema>

export type CadwellZone = z.infer<typeof cadwellZoneSchema>

export type CadwellLevel = z.infer<typeof cadwellLevelSchema>

export type CadwellProgress = z.infer<typeof cadwellProgressSchema>

export type SparseAntiquityLore = z.infer<typeof countsById>

export type SparseLoreLibrary = z.infer<typeof listsByTwoIds>

export type SparseZoneCompletion = z.infer<typeof listsByTwoIds>

export type SparseRecipes = z.infer<typeof listsById>

export type SparsePoiDiscovery = z.infer<typeof listsById>

export type ItemSetProgress = z.infer<typeof itemSetProgressSchema>

export type AccountCompletion = z.infer<typeof accountCompletionSchema>

export type CharacterCompletion = z.infer<typeof characterCompletionSchema>

export type CompanionCompletion = z.infer<typeof companionCompletionSchema>
