import {
  ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT,
  ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT,
  ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-eso-trait-map/companion-eso-trait-map.module.code.ts"
import { COMPANION_TRAIT_PAGES } from "akasha/temper/catalog/companion/companions-core/modules/companion-trait-pages/companion-trait-pages.module.code.ts"
import { armorTraits } from "akasha/temper/catalog/gear/equipment/modules/armor-traits/armor-traits.module.code.ts"
import {
  PLAYER_ARMOR_TRAIT_TO_ESO,
  PLAYER_JEWELRY_TRAIT_TO_ESO,
  PLAYER_WEAPON_TRAIT_TO_ESO,
} from "akasha/temper/catalog/gear/equipment/modules/eso-trait-map/eso-trait-map.module.code.ts"
import { jewelryTraits } from "akasha/temper/catalog/gear/equipment/modules/jewelry-traits/jewelry-traits.module.code.ts"
import { weaponTraits } from "akasha/temper/catalog/gear/equipment/modules/weapon-traits/weapon-traits.module.code.ts"
import { runChecker } from "akasha/temper/items/filters/core/modules/search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterEditorOption } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { parseStringArray } from "akasha/temper/items/filters/core/modules/search-string-array-parse/search-string-array-parse.module.code.ts"
import { checkClassification } from "akasha/temper/items/rules/eval/modules/check-classification/check-classification.module.code.ts"

function buildTraitOptions(): readonly FilterEditorOption[] {
  const all = [
    ...[...weaponTraits.list, ...armorTraits.list, ...jewelryTraits.list].map((trait) => ({
      value: trait.id,
      label: trait.name,
    })),
    ...COMPANION_TRAIT_PAGES.map((trait) => ({
      value: trait.key,
      label: trait.title ?? trait.key,
    })),
  ]
  return all.filter((opt, i, arr) => arr.findIndex((other) => other.value === opt.value) === i)
}

function buildTraitIdToEsoNumbers(): ReadonlyMap<string, readonly number[]> {
  const acc = new Map<string, number[]>()
  const addForward = (forward: Record<string, number>): undefined => {
    for (const [traitId, esoNum] of Object.entries(forward)) {
      if (esoNum === 0) continue
      const list = acc.get(traitId) ?? []
      if (!list.includes(esoNum)) list.push(esoNum)
      acc.set(traitId, list)
    }
  }
  const addReverse = (reverse: Record<number, string>): undefined => {
    for (const [esoKey, traitId] of Object.entries(reverse)) {
      const esoNum = Number(esoKey)
      if (esoNum === 0) continue
      const list = acc.get(traitId) ?? []
      if (!list.includes(esoNum)) list.push(esoNum)
      acc.set(traitId, list)
    }
  }
  addForward(PLAYER_WEAPON_TRAIT_TO_ESO)
  addForward(PLAYER_ARMOR_TRAIT_TO_ESO)
  addForward(PLAYER_JEWELRY_TRAIT_TO_ESO)
  addReverse(ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT)
  addReverse(ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT)
  addReverse(ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT)
  return acc
}

const TRAIT_ID_TO_ESO_NUMBERS = buildTraitIdToEsoNumbers()

function selectedTraitsToEsoTerms(selected: readonly string[]): readonly number[] {
  const ids: number[] = []
  for (const traitId of selected) {
    const esoNums = TRAIT_ID_TO_ESO_NUMBERS.get(traitId)
    if (esoNums === undefined) continue
    for (const esoNum of esoNums) {
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
    options: buildTraitOptions(),
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
