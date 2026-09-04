import {
  ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT,
  ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT,
  ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT,
} from "@akasha/temper-companions-core/companion-eso-trait-map"
import { companionTraits } from "@akasha/temper-companions-core/companion-traits"
import { armorTraits } from "@akasha/temper-equipment/armor-traits"
import {
  PLAYER_ARMOR_TRAIT_TO_ESO,
  PLAYER_JEWELRY_TRAIT_TO_ESO,
  PLAYER_WEAPON_TRAIT_TO_ESO,
} from "@akasha/temper-equipment/eso-trait-map"
import { jewelryTraits } from "@akasha/temper-equipment/jewelry-traits"
import { weaponTraits } from "@akasha/temper-equipment/weapon-traits"
import { checkClassification } from "@akasha/temper-items-rules-eval/check-classification"
import { runChecker } from "../search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterEditorOption } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseStringArray } from "../search-string-array-parse/search-string-array-parse.module.code.ts"

function buildTraitOptions(): readonly FilterEditorOption[] {
  const all = [
    ...weaponTraits.list,
    ...armorTraits.list,
    ...jewelryTraits.list,
    ...companionTraits.list,
  ].map((trait) => ({ value: trait.id, label: trait.name }))
  return all.filter((opt, i, arr) => arr.findIndex((other) => other.value === opt.value) === i)
}

const TRAIT_OPTIONS = buildTraitOptions()

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
  editor: { kind: "multiselect", options: TRAIT_OPTIONS },
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
