import { classifyItemToNodeIds } from "akasha/temper/items-core/classify-item-node-ids/classify-item-node-ids.module.code.ts"
import { parseInventoryContent } from "akasha/temper/items-core/inventory-parser/inventory-parser.module.code.ts"
import type {
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationData,
} from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import { parseItemLink } from "akasha/temper/items-core/item-link-parser/item-link-parser.module.code.ts"
import { locationConditionFromKeyAndBag } from "akasha/temper/items-core/location-condition/location-condition.module.code.ts"
import { computeStockGroups } from "akasha/temper/items-rules-eval/compute-stock-groups/compute-stock-groups.module.code.ts"
import { walkRules } from "akasha/temper/items-rules-eval/evaluator/evaluator.module.code.ts"
import { loadTemperCharactersFromPath } from "../inventory-characters-reading/inventory-characters-reading.module.code.ts"
import { loadTemperInventoryConfigFromPath } from "../inventory-config-reading/inventory-config-reading.module.code.ts"
import { buildCliEvalEnv } from "../inventory-eval-env/inventory-eval-env.module.code.ts"
import { cliItemFactsFromInventoryItem } from "../inventory-item-facts/inventory-item-facts.module.code.ts"

export type LocationConditionId = ReturnType<typeof locationConditionFromKeyAndBag>

export type StockGroups = ReturnType<typeof computeStockGroups>

export interface ResolvedInventoryItem {
  readonly item: InventoryItemData
  readonly location: LocationConditionId
}

export interface ExplainCapabilities {
  readonly parseItemLink: typeof parseItemLink
  readonly parseInventoryContent: typeof parseInventoryContent
  readonly classifyItemToNodeIds: typeof classifyItemToNodeIds
  readonly locationConditionFromKeyAndBag: typeof locationConditionFromKeyAndBag
  readonly cliItemFactsFromInventoryItem: typeof cliItemFactsFromInventoryItem
  readonly buildCliEvalEnv: typeof buildCliEvalEnv
  readonly computeStockGroups: typeof computeStockGroups
  readonly walkRules: typeof walkRules
  readonly loadTemperCharactersFromPath: typeof loadTemperCharactersFromPath
  readonly loadTemperInventoryConfigFromPath: typeof loadTemperInventoryConfigFromPath
}

export async function explainCapabilities(): Promise<ExplainCapabilities> {
  return {
    parseItemLink,
    parseInventoryContent,
    classifyItemToNodeIds,
    locationConditionFromKeyAndBag,
    cliItemFactsFromInventoryItem,
    buildCliEvalEnv,
    computeStockGroups,
    walkRules,
    loadTemperCharactersFromPath,
    loadTemperInventoryConfigFromPath,
  }
}

function findResolvedItemInLocation(
  caps: ExplainCapabilities,
  locationKey: string,
  location: InventoryLocationData,
  targetItemId: number
): ResolvedInventoryItem | undefined {
  for (const [bagId, bag] of Object.entries(location.bags)) {
    for (const item of Object.values(bag)) {
      if (item.itemId === targetItemId) {
        return {
          item,
          location: caps.locationConditionFromKeyAndBag(locationKey, Number(bagId)),
        }
      }
    }
  }
  return undefined
}

export function resolveItemFromInventory(
  caps: ExplainCapabilities,
  db: InventoryDatabase,
  targetItemId: number,
  charId?: string
): ResolvedInventoryItem | undefined {
  if (charId !== undefined) {
    const scoped = db.locations[charId]
    return scoped !== undefined
      ? findResolvedItemInLocation(caps, charId, scoped, targetItemId)
      : undefined
  }
  const sorted = Object.entries(db.locations).sort(([, a], [, b]) => b.lastScanned - a.lastScanned)
  for (const [locationKey, location] of sorted) {
    const found = findResolvedItemInLocation(caps, locationKey, location, targetItemId)
    if (found !== undefined) return found
  }
  return undefined
}

export function allBagItems(
  caps: ExplainCapabilities,
  db: InventoryDatabase
): ReadonlyArray<ResolvedInventoryItem> {
  const out: ResolvedInventoryItem[] = []
  for (const [locationKey, location] of Object.entries(db.locations)) {
    for (const [bagId, bag] of Object.entries(location.bags)) {
      const resolvedLocation = caps.locationConditionFromKeyAndBag(locationKey, Number(bagId))
      for (const item of Object.values(bag)) {
        out.push({ item, location: resolvedLocation })
      }
    }
  }
  return out
}
