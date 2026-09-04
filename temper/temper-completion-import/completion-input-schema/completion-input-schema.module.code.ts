import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { z } from "zod"

function tolerant<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().catch(undefined)
}

const numberList = tolerant(luaArrayOrEmpty(z.number()))

const looseRecord = tolerant(z.record(z.string(), z.unknown()))

export const accountCompletionInputSchema = z.looseObject({
  achievements: looseRecord,
  itemSets: looseRecord,
  antiquityLore: looseRecord,
  championPointsEarned: tolerant(z.number()),
  collectibles: numberList,
  subclassingSkillLineProgress: looseRecord,
  tributeCardUpgrades: looseRecord,
  bankUpgrade: looseRecord,
  grandMasterStations: looseRecord,
})

export const characterCompletionInputSchema = z.looseObject({
  name: tolerant(z.string()),
  priorityOrder: tolerant(z.number()),

  buildHash: tolerant(z.string()),
  gender: tolerant(z.number()),
  level: tolerant(z.number()),
  classId: tolerant(z.number()),
  allianceId: tolerant(z.number()),
  raceId: tolerant(z.number()),
  curseState: tolerant(z.string()),
  className: tolerant(z.string()),
  classIcon: tolerant(z.string()),
  companionRapport: looseRecord,
  quests: numberList,
  bagSize: tolerant(z.number()),
  allianceRank: tolerant(z.number()),

  achievements: looseRecord,
  skillLineProgress: looseRecord,
  loreLibrary: looseRecord,
  recipes: looseRecord,
  scribing: looseRecord,
  skillPoints: looseRecord,
  traitResearch: looseRecord,
  cadwell: looseRecord,
  zoneCompletion: looseRecord,
  pointsOfInterest: looseRecord,
  mountTraining: looseRecord,
  dailyWrits: looseRecord,
})

export const companionCompletionInputSchema = z.looseObject({
  build: looseRecord,
  selectedBuild: tolerant(z.string()),
  targetBuildHash: tolerant(z.string()),
  level: tolerant(z.number()),
  currentXP: tolerant(z.number()),
  rapport: tolerant(z.number()),
  skillLineProgress: looseRecord,
})

export function cleanAccountCompletionInput(value: unknown): unknown {
  const parsed = accountCompletionInputSchema.safeParse(value)
  return parsed.success ? parsed.data : value
}
export function cleanCharacterCompletionInput(value: unknown): unknown {
  const parsed = characterCompletionInputSchema.safeParse(value)
  return parsed.success ? parsed.data : value
}
export function cleanCompanionCompletionInput(value: unknown): unknown {
  const parsed = companionCompletionInputSchema.safeParse(value)
  return parsed.success ? parsed.data : value
}
