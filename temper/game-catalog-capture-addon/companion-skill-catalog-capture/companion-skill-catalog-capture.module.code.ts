import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-functions-05"
import "@akasha/temper-eso-types/eso-functions-10"
import "@akasha/temper-eso-types/eso-globals"

import type {
  CompanionSkillCatalogAbility,
  CompanionSkillCatalogLine,
} from "@akasha/temper-capture-shapes/companion-skill-catalog"
import { runBatched } from "@akasha/temper-capture-writer/run-batched"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

const BATCH_SIZE = 100
const BATCH_DELAY = 100

interface CompanionSkillWorkItem {
  skillLineId: number
  abilityIndex: number
}

export function collectCompanionSkillCatalog(
  this: void,
  onComplete: (this: void) => void
): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, CompanionSkillCatalogLine> = {}
  const workItems: CompanionSkillWorkItem[] = []

  for (
    let skillType = SKILL_TYPE_ITERATION_BEGIN;
    skillType <= SKILL_TYPE_ITERATION_END;
    skillType++
  ) {
    const numLines = GetNumCompanionSkillLines(skillType)

    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const skillLineId = GetCompanionSkillLineId(skillType, lineIndex)
      if (skillLineId === 0) continue

      const lineName = zo_strformat("<<1>>", GetCompanionSkillLineNameById(skillLineId))
      if (lineName === "") continue

      catalog[skillLineId] = {
        name: lineName,
        skillType,
        lineIndex,
        maxRank: 0,
        abilities: {},
      }

      const numAbilities = GetNumAbilitiesInCompanionSkillLine(skillLineId)
      for (let abilityIndex = 1; abilityIndex <= numAbilities; abilityIndex++) {
        workItems.push({ skillLineId, abilityIndex })
      }
    }
  }

  runBatched<CompanionSkillWorkItem>({
    items: workItems,
    batchSize: BATCH_SIZE,
    batchDelay: BATCH_DELAY,
    process: function (this: void, item: CompanionSkillWorkItem): undefined {
      const lineEntry = catalog[item.skillLineId]
      if (!lineEntry) return

      const abilityId = GetCompanionAbilityId(item.skillLineId, item.abilityIndex)
      if (abilityId === 0) return

      const rankRequired = GetCompanionAbilityRankRequired(abilityId)
      const ability: CompanionSkillCatalogAbility = {
        abilityId,
        name: zo_strformat("<<1>>", GetAbilityName(abilityId)),
        description: GetAbilityDescription(abilityId, undefined, "companion"),
        icon: GetAbilityIcon(abilityId),
        rankRequired,
      }

      lineEntry.abilities[item.abilityIndex] = ability
      if (rankRequired > lineEntry.maxRank) {
        lineEntry.maxRank = rankRequired
      }
    },
    onComplete: function (this: void): undefined {
      savedVars.companionSkillCatalog = catalog
      onComplete()
    },
  })
}
registerCatalogDomain({ key: "companionSkillCatalog", collect: collectCompanionSkillCatalog })
