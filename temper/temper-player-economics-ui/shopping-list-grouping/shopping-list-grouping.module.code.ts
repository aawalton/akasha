import { companionTraits } from "@akasha/temper-companions-core/companion-traits"
import { getQualityClassName } from "@akasha/temper-companions-ui/companion-quality-rules"
import type { CompanionGearNeed } from "@akasha/temper-items-core/companion-gear-diff"
import type { ShoppingPlan } from "@akasha/temper-shopping/ttc-shopping-types"
import {
  getCompanionGearItemName,
  resolveNeedPrice,
} from "../companion-gear-pricing-rules/companion-gear-pricing-rules.module.code.ts"
import type { MissingItemDisplay } from "../shopping-route-overview-panel-card/shopping-route-overview-panel-card.module.code.tsx"

export interface IndexedNeed {
  need: CompanionGearNeed
  index: number
  key: string
}

export interface GroupedItem {
  displayKey: string
  itemName: string
  traitName: string
  qualityClass: string | undefined
  count: number
  keys: readonly string[]
  unitPrice: number | null
}

export interface CategoryGroup {
  category: "Armor" | "Jewelry" | "Weapons"
  items: readonly GroupedItem[]
  totalCount: number
  totalCost: number | null
}

type SlotPriceMap = Parameters<typeof resolveNeedPrice>[2]
type BlendedPriceMap = Parameters<typeof resolveNeedPrice>[3]

const traitName = (need: CompanionGearNeed): string =>
  companionTraits.has(need.trait) ? companionTraits.data[need.trait].name : need.trait

export function buildCategoryGroups(
  listedNeeds: readonly IndexedNeed[],
  slotPriceMap: SlotPriceMap | null,
  blendedPriceMap: BlendedPriceMap | null
): readonly CategoryGroup[] {
  const buckets: [CategoryGroup["category"], "armor" | "jewelry" | "weapon"][] = [
    ["Armor", "armor"],
    ["Jewelry", "jewelry"],
    ["Weapons", "weapon"],
  ]

  const result: CategoryGroup[] = []
  for (const [label, cat] of buckets) {
    const catNeeds = listedNeeds.filter((n) => n.need.category === cat)
    if (catNeeds.length === 0) continue

    const grouped = new Map<string, GroupedItem>()
    const keysByDisplayKey = new Map<string, string[]>()
    for (const { need, index, key } of catNeeds) {
      const itemName = getCompanionGearItemName(need)
      const trait = traitName(need)
      const displayKey = `${itemName}:${trait}:${need.quality}`

      const existing = grouped.get(displayKey)
      if (existing) {
        existing.count++
        keysByDisplayKey.get(displayKey)?.push(key)
      } else {
        const price =
          slotPriceMap && blendedPriceMap
            ? resolveNeedPrice(need, index, slotPriceMap, blendedPriceMap)
            : null
        const keysList: string[] = [key]
        keysByDisplayKey.set(displayKey, keysList)
        grouped.set(displayKey, {
          displayKey,
          itemName,
          traitName: trait,
          qualityClass: getQualityClassName(need.quality),
          count: 1,
          keys: keysList,
          unitPrice: price?.estimatedCost ?? null,
        })
      }
    }

    const items = [...grouped.values()].sort((a, b) =>
      `${a.itemName} (${a.traitName})`.localeCompare(`${b.itemName} (${b.traitName})`)
    )
    let catCost = 0
    for (const item of items) {
      if (item.unitPrice != null) catCost += item.unitPrice * item.count
    }

    result.push({
      category: label,
      items,
      totalCount: catNeeds.length,
      totalCost: catCost > 0 ? catCost : null,
    })
  }

  return result
}

export function buildMissingItemDisplays(
  plan: ShoppingPlan | null,
  extraMissing: ReadonlySet<string>,
  listedNeeds: readonly IndexedNeed[]
): readonly MissingItemDisplay[] {
  if (!plan) return []

  const allMissingKeys = new Set([...plan.missingItems, ...extraMissing])
  if (allMissingKeys.size === 0) return []

  const grouped = new Map<string, MissingItemDisplay>()
  for (const { need, key } of listedNeeds) {
    if (!allMissingKeys.has(key)) continue
    const itemName = getCompanionGearItemName(need)
    const trait = traitName(need)
    const displayKey = `${itemName}:${trait}:${need.quality}`

    const existing = grouped.get(displayKey)
    if (existing) {
      existing.count++
    } else {
      grouped.set(displayKey, {
        displayKey,
        itemName,
        traitName: trait,
        qualityClass: getQualityClassName(need.quality),
        count: 1,
      })
    }
  }
  return [...grouped.values()].sort((a, b) =>
    `${a.itemName} (${a.traitName})`.localeCompare(`${b.itemName} (${b.traitName})`)
  )
}
