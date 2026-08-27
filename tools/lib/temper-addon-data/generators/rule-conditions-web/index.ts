import { WEB_CONDITIONS_PREAMBLE } from "../rule-conditions-web-preamble.ts"
import { WEB_CAN_SELL_CONDITION } from "./can-sell.ts"
import { WEB_COMBINED_LEVEL_HELPER } from "./combined-level.ts"
import { WEB_COMPANION_EQUIP_CONDITION } from "./companion-equip.ts"
import { WEB_CONTAINER_CONDITIONS } from "./containers.ts"
import { WEB_CRAFTED_CONDITION } from "./crafted.ts"
import { WEB_INSPIRATION_CONDITION } from "./inspiration.ts"
import { WEB_ITEM_FLAG_CONDITIONS } from "./item-flags.ts"
import { WEB_ITEM_NAME_CONDITION } from "./item-name.ts"
import { WEB_KNOWLEDGE_CONDITIONS } from "./knowledge.ts"
import { WEB_LEVEL_CONDITION } from "./level.ts"
import { WEB_POTION_DATA_HELPER } from "./potion-data.ts"
import { WEB_POTION_EFFECT_CONDITIONS } from "./potion-effects.ts"
import { WEB_QUALITY_CONDITION } from "./quality.ts"
import { WEB_RESEARCH_CONDITION } from "./research.ts"
import { WEB_SET_SOURCE_CONDITIONS } from "./set-sources.ts"
import { WEB_STACK_FULLNESS_CONDITION } from "./stack-fullness.ts"
import { WEB_TRAIT_CONDITIONS } from "./traits.ts"
import { WEB_VALUE_CONDITIONS } from "./value.ts"
import { WEB_WANTED_AND_STOCK_CONDITIONS } from "./wanted-and-stock.ts"

export function generateWebConditions(): string {
  return `${WEB_CONDITIONS_PREAMBLE}
// =============================================================================
// Private helpers
// =============================================================================

${WEB_COMBINED_LEVEL_HELPER}

${WEB_POTION_DATA_HELPER}

// =============================================================================
// Condition checking
// =============================================================================

/**
 * Check if an item passes the verifiable conditions of a category rule.
 * Conditions checkable from scan data (quality, level, value, stolen, bound)
 * are enforced fail-closed: if the field is absent, the item is excluded.
 * Computed conditions (isTargetEquip, traits, canUse, etc.) require a context
 * object — without it they pass through (same as before).
 * canResearch uses completion trait research data when available; passes through without it.
 * canInspire uses per-character crafting passive ranks when available; passes through without them.
 */
export function itemPassesConditions(
  item: InventoryItemData,
  conditions: CategoryRule["conditions"],
  context?: RuleMatcherContext
): boolean {
  if (!conditions) return true

${WEB_QUALITY_CONDITION}

${WEB_LEVEL_CONDITION}

${WEB_VALUE_CONDITIONS}

${WEB_ITEM_FLAG_CONDITIONS}

${WEB_STACK_FULLNESS_CONDITION}

${WEB_POTION_EFFECT_CONDITIONS}

${WEB_CAN_SELL_CONDITION}

${WEB_CRAFTED_CONDITION}

${WEB_KNOWLEDGE_CONDITIONS}

${WEB_ITEM_NAME_CONDITION}

  // =========================================================================
  // Computed conditions — require context, pass through without it
  // =========================================================================

${WEB_COMPANION_EQUIP_CONDITION}

${WEB_TRAIT_CONDITIONS}

${WEB_SET_SOURCE_CONDITIONS}

${WEB_RESEARCH_CONDITION}

${WEB_CONTAINER_CONDITIONS}

${WEB_INSPIRATION_CONDITION}

${WEB_WANTED_AND_STOCK_CONDITIONS}

  return true
}
`
}
