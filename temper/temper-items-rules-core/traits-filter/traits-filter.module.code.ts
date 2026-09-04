import { companionTraits } from "@akasha/temper-companions-core/companion-traits"
import { armorTraits } from "@akasha/temper-equipment/armor-traits"
import { jewelryTraits } from "@akasha/temper-equipment/jewelry-traits"
import { weaponTraits } from "@akasha/temper-equipment/weapon-traits"
import type { ItemCategoryNode } from "@akasha/temper-items-core/item-category-tree-types"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

type TraitFamily = "weapon" | "armor" | "jewelry" | "companion"

const TRAIT_FAMILY_ROOTS: Record<string, TraitFamily> = {
  weapons: "weapon",
  armor: "armor",
  jewelry: "jewelry",
  "companion-weapons": "companion",
  "companion-armor": "companion",
  "companion-jewelry": "companion",
}

export function getTraitFamily(
  nodeId: string,
  categories: Record<string, ItemCategoryNode>
): TraitFamily | null {
  const directFamily = TRAIT_FAMILY_ROOTS[nodeId]
  if (directFamily !== undefined) return directFamily

  function find(node: ItemCategoryNode, ancestorIds: readonly string[]): TraitFamily | null {
    if (node.id === nodeId) {
      for (const id of ancestorIds) {
        const ancestorFamily = TRAIT_FAMILY_ROOTS[id]
        if (ancestorFamily !== undefined) return ancestorFamily
      }
      return null
    }
    if (node.children) {
      for (const child of node.children) {
        const result = find(child, [...ancestorIds, node.id])
        if (result != null) return result
      }
    }
    return null
  }

  for (const category of Object.values(categories)) {
    if (!category) continue
    const result = find(category, [])
    if (result != null) return result
  }

  return null
}

function sentinelFirstSort(a: FilterOption, b: FilterOption): number {
  if (a.value === "no-trait") return -1
  if (b.value === "no-trait") return 1
  return a.label.localeCompare(b.label)
}

export const TRAIT_OPTIONS_BY_FAMILY: Record<string, FilterOption[]> = {
  all: [...weaponTraits.list, ...armorTraits.list, ...jewelryTraits.list, ...companionTraits.list]
    .map((t) => ({ value: t.id, label: t.name }))
    .filter((t, i, arr) => arr.findIndex((a) => a.value === t.value) === i)
    .sort(sentinelFirstSort),
  weapon: weaponTraits.list.map((t) => ({ value: t.id, label: t.name })).sort(sentinelFirstSort),
  armor: armorTraits.list.map((t) => ({ value: t.id, label: t.name })).sort(sentinelFirstSort),
  jewelry: jewelryTraits.list.map((t) => ({ value: t.id, label: t.name })).sort(sentinelFirstSort),
  companion: companionTraits.list
    .map((t) => ({ value: t.id, label: t.name }))
    .sort(sentinelFirstSort),
}

const read = (c: CategoryRule["conditions"]) =>
  c?.traits && c.traits.length > 0 ? c.traits : undefined

export const TRAITS_FILTER: InventoryRuleFilter = {
  id: "traits",
  label: "Traits",
  priority: 3,
  isEligible: (categoryId, categories) => getTraitFamily(categoryId, categories) !== null,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    return v !== undefined ? [...v].sort().join(",") : undefined
  },
  applyDefault: () => ({}),
  clear: () => ({ traits: undefined }),
  transferToCategory: (c, prevCategoryId, nextCategoryId, categories) => {
    const v = read(c)
    if (v === undefined) return {}
    const prevFamily = getTraitFamily(prevCategoryId, categories)
    const nextFamily = getTraitFamily(nextCategoryId, categories)
    if (nextFamily === null || nextFamily !== prevFamily) return {}
    return { traits: v }
  },
}
