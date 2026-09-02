import { type SkillLineId, skillLines as skillLinesData } from "@akasha/temper-skill-lines/skill-lines"
import { type MorphCharacterRow } from "@temper/game-characters-skills-morphs-access/morph-completion-shapes"
import { resolveSkillMorphs } from "@temper/game-characters-skills-morphs-access/skill-morphs-resolver"
import {
  esoClassIdToClassId,
  esoRaceIdToRaceId,
  getApplicableSkillLineIds,
} from "@temper/game-characters-skills-morphs-access/eso-id-helpers"
import { companions } from "@temper/game-companions-core/companions-data"
import type {
  AccountCompletion,
  CharacterCompletion,
} from "@akasha/temper-completion/completion-progress"
import { clampRapportProgress, MAX_COMPANION_RAPPORT } from "./companion-rapport"
import { transformAntiquityLoreProgress } from "./completion-antiquity-lore-progress"
import type { AnyCompletionCardId } from "./completion-card-id"
import { resolveGenericCheckerProgress } from "./completion-generic-checker-progress"
import { isCharacterMeasured } from "./completion-measured"

const RAPPORT_COMPANION_DEF_IDS: readonly number[] = companions.list
  .filter((c) => c.esoCompanionId !== 0)
  .map((c) => c.esoCompanionId)
const RAPPORT_COMPANION_DEF_ID_SET = new Set<number>(RAPPORT_COMPANION_DEF_IDS)
const TOTAL_RAPPORT = RAPPORT_COMPANION_DEF_IDS.length * MAX_COMPANION_RAPPORT

const SKILL_LINE_BY_ESO_ID = new Map(skillLinesData.list.map((l) => [l.esoSkillLineId, l] as const))
const APPLICABLE_SKILL_LINES_BY_CHARACTER_KIND = new Map<string, Set<SkillLineId>>()

function applicableSkillLineIds(
  charCompletion: CharacterCompletion | null | undefined
): Set<SkillLineId> {
  const classId = esoClassIdToClassId.get(charCompletion?.classId ?? 0) ?? "no-class"
  const raceId = esoRaceIdToRaceId.get(charCompletion?.raceId ?? 0) ?? "no-race"
  const key = `${classId}:${raceId}`
  const memoized = APPLICABLE_SKILL_LINES_BY_CHARACTER_KIND.get(key)
  if (memoized !== undefined) return memoized
  const computed = getApplicableSkillLineIds(classId, raceId)
  APPLICABLE_SKILL_LINES_BY_CHARACTER_KIND.set(key, computed)
  return computed
}

interface TaskProgress {
  current: number
  total: number
}

export function resolveTaskProgress(
  cardId: AnyCompletionCardId | null | undefined,
  itemPath: readonly (string | number)[] | null | undefined,
  charCompletion: CharacterCompletion | null | undefined,
  accountCompletion: AccountCompletion | null | undefined,
  charRow?: MorphCharacterRow | null
): TaskProgress | undefined {
  if (cardId == null) return undefined

  const path = itemPath ?? undefined

  if (cardId === "mount-training") return resolveMountTraining(charCompletion, path)
  if (cardId === "companion-rapport-character") return resolveCompanionRapport(charCompletion, path)
  if (cardId === "skill-lines") return resolveSkillLines(charCompletion, path)
  if (cardId === "skill-morphs") return resolveSkillMorphs(charRow, path)
  if (cardId === "antiquity-lore") return resolveAntiquityLore(accountCompletion)
  if (cardId === "guild-sales") return undefined
  if (cardId === "hireling-mails") return undefined
  if (cardId === "active-quests") return undefined
  if (cardId === "inventory-management") return undefined
  if (cardId === "dungeon-sets") return undefined

  return resolveGenericCheckerProgress(cardId, path, charCompletion, accountCompletion)
}

function resolveMountTraining(
  charCompletion: CharacterCompletion | null | undefined,
  itemPath: readonly (string | number)[] | undefined
): TaskProgress | undefined {
  const mt = charCompletion?.mountTraining
  if (!mt) return undefined

  if (itemPath && itemPath.length > 0) {
    const stat = itemPath[0]
    if (stat === "speed") return { current: mt.speed, total: mt.maxSpeed }
    if (stat === "stamina") return { current: mt.stamina, total: mt.maxStamina }
    if (stat === "carryCapacity") return { current: mt.carryCapacity, total: mt.maxCarryCapacity }
    return undefined
  }

  const current = mt.speed + mt.stamina + mt.carryCapacity
  const total = mt.maxSpeed + mt.maxStamina + mt.maxCarryCapacity
  return { current, total }
}

function resolveCompanionRapport(
  charCompletion: CharacterCompletion | null | undefined,
  itemPath: readonly (string | number)[] | undefined
): TaskProgress | undefined {
  const rapport = charCompletion?.companionRapport

  if (itemPath && itemPath.length > 0) {
    const companionId = itemPath[0]
    if (typeof companionId !== "number") return undefined
    return {
      current: clampRapportProgress(rapport?.[companionId] ?? 0),
      total: MAX_COMPANION_RAPPORT,
    }
  }

  let current = 0
  if (rapport !== undefined) {
    for (const [idKey, level] of Object.entries(rapport)) {
      if (RAPPORT_COMPANION_DEF_ID_SET.has(Number(idKey))) current += clampRapportProgress(level)
    }
  }
  return { current, total: TOTAL_RAPPORT }
}

function resolveSkillLines(
  charCompletion: CharacterCompletion | null | undefined,
  itemPath: readonly (string | number)[] | undefined
): TaskProgress | undefined {
  if (itemPath && itemPath.length > 0) {
    const lineId = itemPath[0]
    if (typeof lineId !== "number") return undefined
    const staticLine = SKILL_LINE_BY_ESO_ID.get(lineId)
    if (staticLine === undefined || staticLine.maxRank === 0) return undefined
    if (!applicableSkillLineIds(charCompletion).has(staticLine.id)) return undefined
    if (!isCharacterMeasured(charCompletion)) return undefined
    return {
      current: charCompletion?.skillLineProgress?.[lineId]?.currentRank ?? 0,
      total: staticLine.maxRank,
    }
  }

  const skillLines = charCompletion?.skillLineProgress
  if (!skillLines) return undefined

  let current = 0
  let total = 0
  for (const line of Object.values(skillLines)) {
    total++
    if (line.nextRankXP === 0 && line.currentRank > 0) current++
  }
  return { current, total }
}

function resolveAntiquityLore(
  accountCompletion: AccountCompletion | null | undefined
): TaskProgress | undefined {
  const progress = transformAntiquityLoreProgress(accountCompletion)
  if (progress.totalCount === 0) return undefined
  return { current: progress.acquiredCount, total: progress.totalCount }
}
