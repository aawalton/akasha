import { STYLE_TO_CHAPTERS } from "@akasha/temper-items-core/motif-chapter-set"
import {
  ITEM_ACTION_VALUES,
  type ItemAction,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  RULE_CONSTANT_KEYS,
  type RuleConstantKey,
} from "@akasha/temper-items-rules-core/rule-constants"
import { loreLibraryData as loreLibraryDataSource } from "@temper/game-completion/generated/lore-library-data.generated"

export { classifyItemToNodeIds } from "@akasha/temper-items-core/classify-item-node-ids"
export { parseInventoryContent } from "@akasha/temper-items-core/inventory-parser"
export { parseMotifBookName } from "@akasha/temper-items-core/motif-name-parser"
export {
  narrowDestination,
  parseItemAction,
} from "@akasha/temper-items-rules-core/inventory-destination-parse"
export { createDefaultRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-settings"
export {
  buildItemFactsFromInventoryItem,
  resolveStaticItemKey,
} from "@akasha/temper-items-rules-eval/build-item-facts-from-inventory-item"
export { resolveItemRoute } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-route"

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

/**
 * The generated lore data keeps its entry shape to itself, so the shape is taken from the data
 * rather than restated here.
 */
type LoreCategoryEntry = (typeof loreLibraryDataSource)[number]

export function loreLibraryData(): readonly LoreCategoryEntry[] {
  return loreLibraryDataSource
}
