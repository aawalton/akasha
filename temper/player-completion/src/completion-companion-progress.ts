import type { SkillLineId } from "@temper/game-characters-skill-lines/skill-lines-data"
import { skillLines } from "@temper/game-characters-skill-lines/skill-lines-data"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import { companions, getCompanionIdByDefId } from "@temper/game-companions-core/companions-data"
import type {
  CharacterCompletion,
  CompanionCompletion,
} from "@temper/game-completion/completion-types"
import { clampRapportProgress, MAX_COMPANION_RAPPORT } from "./companion-rapport"
import { isCharacterMeasured } from "./completion-measured"
import type {
  CharacterCompanionRapportProgress,
  CompanionProgressEntry,
  CompanionSkillLineProgress,
  CompanionSkillLineProgressEntry,
} from "./completion-ui-types"

const MAX_COMPANION_LEVEL = 20

const esoIdToSkillLineId = new Map<number, SkillLineId>()
for (const sl of skillLines.list) {
  if (sl.subcategoryId === "companion") {
    esoIdToSkillLineId.set(sl.esoSkillLineId, sl.id)
  }
}

export function transformCompanionProgress(
  rows: readonly { companionId: string; completion: CompanionCompletion | null }[],
  characterRows: readonly { completion: CharacterCompletion | null }[]
): {
  companionProgress: readonly CompanionProgressEntry[]
  companionSkillLineProgress: readonly CompanionSkillLineProgress[]
} {
  const rowsByCompanionId = new Map<string, CompanionCompletion | null>()
  for (const row of rows) {
    if (companions.has(row.companionId)) {
      rowsByCompanionId.set(row.companionId, row.completion)
    }
  }

  const maxRapportByCompanion = new Map<CompanionId, number>()
  for (const charRow of characterRows) {
    const rapport = charRow.completion?.companionRapport
    if (!rapport) continue
    for (const [defIdStr, value] of Object.entries(rapport)) {
      const companionId = getCompanionIdByDefId(Number(defIdStr))
      if (companionId == null) continue
      const current = maxRapportByCompanion.get(companionId)
      if (current === undefined || value > current) {
        maxRapportByCompanion.set(companionId, value)
      }
    }
  }

  const companionProgressEntries: CompanionProgressEntry[] = []
  const companionSkillLineProgressEntries: CompanionSkillLineProgress[] = []

  for (const companion of companions.list) {
    if (companion.id === "no-companion") continue

    const completion = rowsByCompanionId.get(companion.id) ?? null

    const level = completion?.level
    const rawRapport = maxRapportByCompanion.get(companion.id) ?? completion?.rapport
    const rapport = rawRapport === undefined ? 0 : clampRapportProgress(rawRapport)

    const skillLineProgress = completion?.skillLineProgress
    const slEntries: CompanionSkillLineProgressEntry[] = []

    if (skillLineProgress) {
      for (const key in skillLineProgress) {
        const esoId = Number(key)
        const sl = skillLineProgress[esoId]

        const skillLineId = esoIdToSkillLineId.get(esoId)
        if (skillLineId != null) {
          const slData = skillLines.data[skillLineId]
          slEntries.push({
            skillLineId,
            name: slData.name,
            currentRank: sl?.currentRank ?? 0,
            maxRank: slData.maxRank,
          })
        }
      }
    }

    slEntries.sort((a, b) => {
      const aOrder = skillLines.data[a.skillLineId].displayOrder
      const bOrder = skillLines.data[b.skillLineId].displayOrder
      return aOrder - bOrder
    })

    companionProgressEntries.push({
      companionId: companion.id,
      name: companion.name,
      level,
      maxLevel: MAX_COMPANION_LEVEL,
      rapport,
    })

    if (slEntries.length > 0) {
      companionSkillLineProgressEntries.push({
        companionId: companion.id,
        name: companion.name,
        entries: slEntries,
      })
    }
  }

  companionProgressEntries.sort((a, b) => a.name.localeCompare(b.name))
  companionSkillLineProgressEntries.sort((a, b) => a.name.localeCompare(b.name))

  return {
    companionProgress: companionProgressEntries,
    companionSkillLineProgress: companionSkillLineProgressEntries,
  }
}

const numCompanions = companions.list.filter((c) => c.id !== "no-companion").length

export function transformCharacterCompanionRapport(
  rows: readonly { id: string; completion: CharacterCompletion | null }[]
): readonly CharacterCompanionRapportProgress[] {
  const totalCount = numCompanions * MAX_COMPANION_RAPPORT
  const result: CharacterCompanionRapportProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const rapport = completion.companionRapport
    const entries: { companionId: CompanionId; name: string; rapport: number }[] = []
    let completedCount = 0

    for (const companion of companions.list) {
      if (companion.id === "no-companion") continue

      let rapportValue = 0
      if (rapport) {
        for (const [defIdStr, value] of Object.entries(rapport)) {
          const cId = getCompanionIdByDefId(Number(defIdStr))
          if (cId === companion.id) {
            rapportValue = clampRapportProgress(value)
            break
          }
        }
      }

      completedCount += rapportValue
      entries.push({
        companionId: companion.id,
        name: companion.name,
        rapport: rapportValue,
      })
    }

    entries.sort((a, b) => a.name.localeCompare(b.name))

    result.push({
      characterId: row.id,
      entries,
      completedCount,
      totalCount,
    })
  }

  return result
}
