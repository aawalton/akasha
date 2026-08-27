import { loreLibraryData as loreLibraryDataSource } from "@temper/game-completion/generated/lore-library-data.generated"
import { STYLE_TO_CHAPTERS } from "@temper/game-items-core/motif-chapter-set"
import { ITEM_ACTION_VALUES } from "@temper/game-items-rules-core/inventory-rule-types"
import { RULE_CONSTANT_KEYS } from "@temper/game-items-rules-core/rule-constants"
import type { LoreCategoryEntry } from "./game-item-types.ts"
import type { ItemAction, RuleConstantKey } from "./game-rule-types.ts"

export { classifyItemToNodeIds } from "@temper/game-items-core/classify-item-node-ids"
export { parseInventoryContent } from "@temper/game-items-core/inventory-parser"
export { parseMotifBookName } from "@temper/game-items-core/motif-name-parser"
export { narrowDestination, parseItemAction } from "@temper/game-items-rules-core/inventory-destination-parse"
export { createDefaultRuleSettings } from "@temper/game-items-rules-core/inventory-rule-settings"
export {
  buildItemFactsFromInventoryItem,
  resolveStaticItemKey,
} from "@temper/game-items-rules-eval/build-item-facts-from-inventory-item"
export { resolveItemRoute } from "@temper/game-items-rules-routing-core/inventory-management-plan-route"

export function ruleConstantKeys(): readonly [RuleConstantKey, ...RuleConstantKey[]] {
  return RULE_CONSTANT_KEYS
}

export function itemActionValues(): readonly ItemAction[] {
  return ITEM_ACTION_VALUES
}

/**
 * `STYLE_TO_CHAPTERS` is typed as total over `number`, but it is a lookup table with gaps: a style
 * id it has never heard of reads back `undefined`. The `| undefined` here is what is actually true.
 */
export function styleToChapters(styleId: number): readonly number[] | undefined {
  return STYLE_TO_CHAPTERS[styleId]
}

export function loreLibraryData(): readonly LoreCategoryEntry[] {
  return loreLibraryDataSource
}
