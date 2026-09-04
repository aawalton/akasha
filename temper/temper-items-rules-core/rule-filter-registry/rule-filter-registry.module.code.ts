import { ALL_STOCKED_FILTER } from "../all-stocked-filter/all-stocked-filter.module.code.ts"
import { BOP_TRADEABLE_FILTER } from "../bop-tradeable-filter/bop-tradeable-filter.module.code.ts"
import { BOUND_FILTER } from "../bound-filter/bound-filter.module.code.ts"
import { CAN_COMPANION_EQUIP_FILTER } from "../can-companion-equip-filter/can-companion-equip-filter.module.code.ts"
import { CAN_GIVE_MAX_REWARDS_FILTER } from "../can-give-max-rewards-filter/can-give-max-rewards-filter.module.code.ts"
import { CAN_INSPIRE_FILTER } from "../can-inspire-filter/can-inspire-filter.module.code.ts"
import { CAN_LEVEL_MORPHS_FILTER } from "../can-level-morphs-filter/can-level-morphs-filter.module.code.ts"
import { CAN_LIST_AT_GUILD_TRADER_FILTER } from "../can-list-at-guild-trader-filter/can-list-at-guild-trader-filter.module.code.ts"
import { CAN_OPEN_FILTER } from "../can-open-filter/can-open-filter.module.code.ts"
import { CAN_RESEARCH_FILTER } from "../can-research-filter/can-research-filter.module.code.ts"
import { CAN_SELL_FILTER } from "../can-sell-filter/can-sell-filter.module.code.ts"
import { CAN_UNLOCK_FILTER } from "../can-unlock-filter/can-unlock-filter.module.code.ts"
import { CRAFTED_FILTER } from "../crafted-filter/crafted-filter.module.code.ts"
import { KEEP_QUANTITY_FILTER } from "../keep-quantity-filter/keep-quantity-filter.module.code.ts"
import { KNOWN_FILTER } from "../known-filter/known-filter.module.code.ts"
import { LEVEL_FILTER } from "../level-filter/level-filter.module.code.ts"
import { LOCATION_FILTER } from "../location-filter/location-filter.module.code.ts"
import { LOCKED_FILTER } from "../locked-filter/locked-filter.module.code.ts"
import { MARKET_VALUE_FILTER } from "../market-value-filter/market-value-filter.module.code.ts"
import { MERCHANT_VALUE_FILTER } from "../merchant-value-filter/merchant-value-filter.module.code.ts"
import { NEEDED_FOR_TARGET_CHARACTER_BUILD_FILTER } from "../needed-for-target-character-build-filter/needed-for-target-character-build-filter.module.code.ts"
import { NEEDED_FOR_TARGET_COMPANION_BUILD_FILTER } from "../needed-for-target-companion-build-filter/needed-for-target-companion-build-filter.module.code.ts"
import { POTION_EFFECTS_FILTER } from "../potion-effects-filter/potion-effects-filter.module.code.ts"
import { QUEST_RELEVANT_FILTER } from "../quest-relevant-filter/quest-relevant-filter.module.code.ts"
import { RECONSTRUCTED_FILTER } from "../reconstructed-filter/reconstructed-filter.module.code.ts"
import { REPLACEMENT_VALUE_FILTER } from "../replacement-value-filter/replacement-value-filter.module.code.ts"
import { REQUIRED_CURSE_STATE_FILTER } from "../required-curse-state-filter/required-curse-state-filter.module.code.ts"
import { REQUIRED_SKILL_LINES_FILTER } from "../required-skill-lines-filter/required-skill-lines-filter.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"
import { ITEM_NAME_FILTER } from "../rule-item-name-filter/rule-item-name-filter.module.code.ts"
import { QUALITY_FILTER } from "../rule-quality-filter/rule-quality-filter.module.code.ts"
import { SET_SOURCES_FILTER } from "../set-sources-filter/set-sources-filter.module.code.ts"
import { STACK_FULLNESS_FILTER } from "../stack-fullness-filter/stack-fullness-filter.module.code.ts"
import { STOCK_THRESHOLD_FILTER } from "../stock-threshold-filter/stock-threshold-filter.module.code.ts"
import { STOLEN_FILTER } from "../stolen-filter/stolen-filter.module.code.ts"
import { TARGET_QUANTITY_FILTER } from "../target-quantity-filter/target-quantity-filter.module.code.ts"
import { TRAITS_FILTER } from "../traits-filter/traits-filter.module.code.ts"
import { TRANSMUTED_FILTER } from "../transmuted-filter/transmuted-filter.module.code.ts"
import { VALUE_FILTER } from "../value-filter/value-filter.module.code.ts"

export const INVENTORY_RULE_FILTERS: InventoryRuleFilter[] = [
  QUALITY_FILTER,
  TRAITS_FILTER,
  LOCATION_FILTER,
  SET_SOURCES_FILTER,
  LEVEL_FILTER,
  STOLEN_FILTER,
  CRAFTED_FILTER,
  BOUND_FILTER,
  BOP_TRADEABLE_FILTER,
  QUEST_RELEVANT_FILTER,
  LOCKED_FILTER,
  RECONSTRUCTED_FILTER,
  TRANSMUTED_FILTER,
  KNOWN_FILTER,
  CAN_INSPIRE_FILTER,
  CAN_RESEARCH_FILTER,
  CAN_COMPANION_EQUIP_FILTER,
  NEEDED_FOR_TARGET_CHARACTER_BUILD_FILTER,
  NEEDED_FOR_TARGET_COMPANION_BUILD_FILTER,
  CAN_UNLOCK_FILTER,
  REQUIRED_SKILL_LINES_FILTER,
  REQUIRED_CURSE_STATE_FILTER,
  CAN_LEVEL_MORPHS_FILTER,
  STACK_FULLNESS_FILTER,
  CAN_OPEN_FILTER,
  CAN_SELL_FILTER,
  CAN_LIST_AT_GUILD_TRADER_FILTER,
  CAN_GIVE_MAX_REWARDS_FILTER,
  ALL_STOCKED_FILTER,
  STOCK_THRESHOLD_FILTER,
  ITEM_NAME_FILTER,
  VALUE_FILTER,
  MARKET_VALUE_FILTER,
  MERCHANT_VALUE_FILTER,
  REPLACEMENT_VALUE_FILTER,
  KEEP_QUANTITY_FILTER,
  TARGET_QUANTITY_FILTER,
  POTION_EFFECTS_FILTER,
]
