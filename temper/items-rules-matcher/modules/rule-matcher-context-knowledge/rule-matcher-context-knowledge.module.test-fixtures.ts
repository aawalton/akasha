import type {
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationData,
} from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import type { CompletionCharacterInput } from "akasha/temper/items-rules-core/modules/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import { makeItem } from "akasha/temper/items-rules-core/test-fixtures/inventory-rule-test-utils/inventory-rule-test-utils.test-fixture.code.ts"

export const CHARACTER = "1001"

export const OTHER = "1002"

export function knowing(
  completion: unknown,
  esoCharacterId: string = CHARACTER
): CompletionCharacterInput {
  return { esoCharacterId, targetBuildId: null, sortOrder: 0, completion }
}

export function stacked(itemId: number, stackCount: number): InventoryItemData {
  return makeItem({ itemId, stackCount })
}

export function holding(
  bagsByLocation: Record<string, Record<number, Record<number, InventoryItemData>>>
): InventoryDatabase {
  const locations: Record<string, InventoryLocationData> = {}
  for (const [key, bags] of Object.entries(bagsByLocation)) {
    locations[key] = { bags, displayName: key, lastScanned: 0 }
  }
  return {
    locations,
    meta: { displayName: "Account", worldName: "NA Megaserver", lastFullScan: 0 },
  }
}
