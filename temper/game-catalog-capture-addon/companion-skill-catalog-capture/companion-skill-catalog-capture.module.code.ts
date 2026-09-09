import "akasha/temper/temper-eso-types/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-globals/eso-globals.type-declaration.d.ts"

import type {
  CompanionSkillCatalogAbility,
  CompanionSkillCatalogLine,
} from "akasha/temper/capture-shapes/companion-skill-catalog/companion-skill-catalog.module.code.ts"
import { runBatched } from "akasha/temper/capture-writer/run-batched/run-batched.module.code.ts"
import { registerCatalogDomain } from "../../catalog-core/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "../../catalog-core/saved-variables-accessor/saved-variables-accessor.module.code.ts"

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
