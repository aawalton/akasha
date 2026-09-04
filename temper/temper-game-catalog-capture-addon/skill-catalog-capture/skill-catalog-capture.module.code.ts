import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-04"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-functions-10"
import "@akasha/temper-eso-types/eso-globals"
import type {
  SkillCatalogAbility,
  SkillCatalogLine,
  SkillCatalogMorph,
} from "@akasha/temper-capture-shapes/skill-catalog"
import { runBatched } from "@akasha/temper-capture-writer/run-batched"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

const BATCH_SIZE = 100
const BATCH_DELAY = 100

export const MORPH_SLOTS = [MORPH_SLOT_BASE, MORPH_SLOT_MORPH_1, MORPH_SLOT_MORPH_2]

const EXCLUDE_FROM_COMPLETION_LINE_IDS: ReadonlySet<number> = new Set<number>([71])

const MAX_RANK_SAFETY_CAP = 200

function getSkillLineMaxRank(this: void, skillType: number, lineIndex: number): number {
  let rank = 1
  while (rank <= MAX_RANK_SAFETY_CAP) {
    const [startXP] = GetSkillLineRankXPExtents(skillType, lineIndex, rank)
    if (startXP === undefined) return rank - 1
    rank++
  }
  return MAX_RANK_SAFETY_CAP
}

export interface SkillWorkItem {
  skillType: number
  lineIndex: number
  abilityIndex: number
  esoSkillLineId: number
}

export function collectSkillsCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, SkillCatalogLine> = {}

  const workItems: SkillWorkItem[] = []

  for (
    let skillType = SKILL_TYPE_ITERATION_BEGIN;
    skillType <= SKILL_TYPE_ITERATION_END;
    skillType++
  ) {
    const numLines = GetNumSkillLines(skillType)

    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const esoSkillLineId = GetSkillLineId(skillType, lineIndex)
      if (esoSkillLineId === 0) continue

      const [rawLineName] = GetSkillLineInfo(skillType, lineIndex)
      const lineName = zo_strformat("<<1>>", rawLineName)
      if (lineName === "") continue

      catalog[esoSkillLineId] = {
        name: lineName,
        skillType,
        lineIndex,
        orderingIndex: GetSkillLineOrderingIndex(skillType, lineIndex),
        maxRank: getSkillLineMaxRank(skillType, lineIndex),
        excludeFromCompletion: EXCLUDE_FROM_COMPLETION_LINE_IDS.has(esoSkillLineId),
        abilities: {},
      }

      const numAbilities = GetNumSkillAbilities(skillType, lineIndex)
      for (let abilityIndex = 1; abilityIndex <= numAbilities; abilityIndex++) {
        workItems.push({ skillType, lineIndex, abilityIndex, esoSkillLineId })
      }
    }
  }

  runBatched<SkillWorkItem>({
    items: workItems,
    batchSize: BATCH_SIZE,
    batchDelay: BATCH_DELAY,
    process: function (this: void, item: SkillWorkItem): undefined {
      const lineEntry = catalog[item.esoSkillLineId]
      if (!lineEntry) return

      const isPassive = IsSkillAbilityPassive(item.skillType, item.lineIndex, item.abilityIndex)
      const isUltimate = IsSkillAbilityUltimate(item.skillType, item.lineIndex, item.abilityIndex)
      const lineRankNeeded = GetSkillAbilityLineRankNeededToUnlock(
        item.skillType,
        item.lineIndex,
        item.abilityIndex
      )
      const learnedLevel = GetSkillAbilityCharacterLevelNeededToUnlock(
        item.skillType,
        item.lineIndex,
        item.abilityIndex
      )

      const abilityEntry: SkillCatalogAbility = {
        baseName: "",
        isPassive,
        isUltimate,
        lineRankNeeded,
        learnedLevel,
      }

      if (isPassive) {
        const abilityId = GetSkillAbilityId(
          item.skillType,
          item.lineIndex,
          item.abilityIndex,
          false
        )
        if (abilityId === 0) return

        const [abilityName] = GetSkillAbilityInfo(item.skillType, item.lineIndex, item.abilityIndex)
        abilityEntry.baseName = zo_strformat("<<1>>", abilityName)
        abilityEntry.abilityId = abilityId
        abilityEntry.name = zo_strformat("<<1>>", GetAbilityName(abilityId))
        abilityEntry.description = GetAbilityDescription(abilityId, undefined, "player")
        abilityEntry.icon = GetAbilityIcon(abilityId)
      } else {
        const progressionId = GetProgressionSkillProgressionId(
          item.skillType,
          item.lineIndex,
          item.abilityIndex
        )

        if (progressionId === 0) return

        const morphs: Record<number, SkillCatalogMorph> = {}

        for (const morphSlot of MORPH_SLOTS) {
          const abilityId = GetProgressionSkillMorphSlotAbilityId(progressionId, morphSlot)
          if (abilityId === 0) continue

          morphs[morphSlot] = {
            abilityId,
            name: zo_strformat("<<1>>", GetAbilityName(abilityId)),
            description: GetAbilityDescription(abilityId, undefined, "player"),
            icon: GetAbilityIcon(abilityId),
          }
        }

        const baseMorph = morphs[MORPH_SLOT_BASE]
        abilityEntry.baseName = baseMorph !== undefined ? baseMorph.name : ""
        abilityEntry.morphs = morphs
      }

      lineEntry.abilities[item.abilityIndex] = abilityEntry
    },
    onComplete: function (this: void): undefined {
      savedVars.skillCatalog = catalog
      onComplete()
    },
  })
}
registerCatalogDomain({ key: "skillCatalog", collect: collectSkillsCatalog })
