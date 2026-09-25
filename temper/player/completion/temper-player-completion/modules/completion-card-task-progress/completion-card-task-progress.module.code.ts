import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import type {
  AccountCheckerInput,
  ItemProgress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import type { AnyCompletionCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-id/completion-card-id.module.code.ts"
import { countCompanionRapport } from "akasha/temper/player/completion/temper-player-completion/modules/completion-companion-rapport-tally/completion-companion-rapport-tally.module.code.ts"
import { resolveGenericCheckerProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-generic-checker-progress/completion-generic-checker-progress.module.code.ts"
import type { ItemPath } from "akasha/temper/player/completion/temper-player-completion/modules/completion-item-picker/completion-item-picker.module.code.ts"
import { isCharacterMeasured } from "akasha/temper/player/completion/temper-player-completion/modules/completion-measured/completion-measured.module.code.ts"
import {
  ESO_CLASS_ID_TO_CLASS_ID,
  ESO_RACE_ID_TO_RACE_ID,
  getApplicableSkillLineIds,
} from "akasha/temper/player/skill-morph/access/modules/eso-id-helpers/eso-id-helpers.module.code.ts"
import type { MorphCharacterRow } from "akasha/temper/player/skill-morph/access/modules/morph-completion-shapes/morph-completion-shapes.module.code.ts"
import { resolveSkillMorphs } from "akasha/temper/player/skill-morph/access/modules/skill-morphs-resolver/skill-morphs-resolver.module.code.ts"

const SKILL_LINE_BY_ESO_ID = new Map(skillLines.list.map((line) => [line.esoSkillLineId, line]))

const APPLICABLE_SKILL_LINES_BY_KIND = new Map<
  string,
  ReturnType<typeof getApplicableSkillLineIds>
>()

function applicableSkillLineIds(charCompletion: CharacterCompletion | null | undefined) {
  const classId = ESO_CLASS_ID_TO_CLASS_ID.get(charCompletion?.classId ?? 0) ?? "no-class"
  const raceId = ESO_RACE_ID_TO_RACE_ID.get(charCompletion?.raceId ?? 0) ?? "no-race"
  const key = `${classId}:${raceId}`
  const memoized = APPLICABLE_SKILL_LINES_BY_KIND.get(key)
  if (memoized !== undefined) return memoized
  const computed = getApplicableSkillLineIds(classId, raceId)
  APPLICABLE_SKILL_LINES_BY_KIND.set(key, computed)
  return computed
}

const UNMEASURED_CARD_IDS: readonly string[] = [
  "guild-sales",
  "hireling-mails",
  "active-quests",
  "inventory-management",
  "dungeon-sets",
  "antiquity-leads-motifs",
  "antiquity-leads-legendary",
]

export function isUnmeasuredCard(cardId: string | undefined): boolean {
  return cardId !== undefined && UNMEASURED_CARD_IDS.includes(cardId)
}

export function resolveTaskProgress(
  cardId: AnyCompletionCardId | null | undefined,
  itemPath: ItemPath | null | undefined,
  charCompletion: CharacterCompletion | null | undefined,
  account: AccountCheckerInput,
  charRow?: MorphCharacterRow | null
): ItemProgress | undefined {
  if (cardId == null) return undefined
  const path = itemPath ?? undefined

  if (cardId === "mount-training") return resolveMountTraining(charCompletion, path)
  if (cardId === "companion-rapport-character") return resolveCompanionRapport(charCompletion, path)
  if (cardId === "skill-lines") return resolveSkillLines(charCompletion, path)
  if (cardId === "skill-morphs") return resolveSkillMorphs(charRow, path)
  if (UNMEASURED_CARD_IDS.includes(cardId)) return undefined

  return resolveGenericCheckerProgress(cardId, path, charCompletion, account)
}

function resolveMountTraining(
  charCompletion: CharacterCompletion | null | undefined,
  itemPath: ItemPath | undefined
): ItemProgress | undefined {
  const mount = charCompletion?.mountTraining
  if (!mount) return undefined

  if (itemPath && itemPath.length > 0) {
    const stat = itemPath[0]
    if (stat === "speed") return { current: mount.speed, total: mount.maxSpeed }
    if (stat === "stamina") return { current: mount.stamina, total: mount.maxStamina }
    if (stat === "carryCapacity") {
      return { current: mount.carryCapacity, total: mount.maxCarryCapacity }
    }
    return undefined
  }

  return {
    current: mount.speed + mount.stamina + mount.carryCapacity,
    total: mount.maxSpeed + mount.maxStamina + mount.maxCarryCapacity,
  }
}

function resolveCompanionRapport(
  charCompletion: CharacterCompletion | null | undefined,
  itemPath: ItemPath | undefined
): ItemProgress | undefined {
  return countCompanionRapport(charCompletion?.companionRapport, itemPath ?? [])
}

function resolveSkillLines(
  charCompletion: CharacterCompletion | null | undefined,
  itemPath: ItemPath | undefined
): ItemProgress | undefined {
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

  const progress = charCompletion?.skillLineProgress
  if (!progress) return undefined

  let current = 0
  let total = 0
  for (const line of Object.values(progress)) {
    total++
    if (line.nextRankXP === 0 && line.currentRank > 0) current++
  }
  return { current, total }
}
