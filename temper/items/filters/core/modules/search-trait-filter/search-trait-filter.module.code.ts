import {
  addonTraitEsoNumbers,
  addonTraitOptions,
} from "akasha/temper/addon/pages/items/modules/inventory-trait-lookup/inventory-trait-lookup.module.code.ts"
import { runChecker } from "akasha/temper/items/filters/core/modules/search-eval-adapter/search-eval-adapter.module.code.ts"
import { defineFilter } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { parseStringArray } from "akasha/temper/items/filters/core/modules/search-string-array-parse/search-string-array-parse.module.code.ts"
import { checkClassification } from "akasha/temper/items/rules/eval/modules/check-classification/check-classification.module.code.ts"

function selectedTraitsToEsoTerms(selected: readonly string[]): readonly number[] {
  const ids: number[] = []
  for (const traitId of selected) {
    for (const esoNum of addonTraitEsoNumbers(traitId)) {
      if (!ids.includes(esoNum)) ids.push(esoNum)
    }
  }
  return ids
}

export const TRAIT_FILTER = defineFilter<readonly string[]>({
  id: "trait",
  label: "Trait",
  group: "trait",
  editor: {
    kind: "multiselect",
    options: addonTraitOptions(),
  },
  matches(facts, selected) {
    if (selected.length === 0) return true
    return runChecker(checkClassification, facts, { traits: [...selected] })
  },
  applyToSearch(req, selected) {
    req.addExactTerms("trait", selectedTraitsToEsoTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
