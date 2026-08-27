import { allStockedFilter } from "./all-stocked-filter"
import { bopTradeableFilter } from "./bop-tradeable-filter"
import { boundFilter } from "./bound-filter"
import { canCompanionEquipFilter } from "./can-companion-equip-filter"
import { canGiveMaxRewardsFilter } from "./can-give-max-rewards-filter"
import { canInspireFilter } from "./can-inspire-filter"
import { canLevelMorphsFilter } from "./can-level-morphs-filter"
import { canListAtGuildTraderFilter } from "./can-list-at-guild-trader-filter"
import { canOpenFilter } from "./can-open-filter"
import { canResearchFilter } from "./can-research-filter"
import { canSellFilter } from "./can-sell-filter"
import { canUnlockFilter } from "./can-unlock-filter"
import { craftedFilter } from "./crafted-filter"
import type { InventoryRuleFilter } from "./filter-types"
import { itemNameFilter } from "./item-name-filter"
import { keepQuantityFilter } from "./keep-quantity-filter"
import { knownFilter } from "./known-filter"
import { levelFilter } from "./level-filter"
import { locationFilter } from "./location-filter"
import { lockedFilter } from "./locked-filter"
import { marketValueFilter } from "./market-value-filter"
import { merchantValueFilter } from "./merchant-value-filter"
import { neededForTargetCharacterBuildFilter } from "./needed-for-target-character-build-filter"
import { neededForTargetCompanionBuildFilter } from "./needed-for-target-companion-build-filter"
import { potionEffectsFilter } from "./potion-effects-filter"
import { qualityFilter } from "./quality-filter"
import { questRelevantFilter } from "./quest-relevant-filter"
import { reconstructedFilter } from "./reconstructed-filter"
import { replacementValueFilter } from "./replacement-value-filter"
import { requiredCurseStateFilter } from "./required-curse-state-filter"
import { requiredSkillLinesFilter } from "./required-skill-lines-filter"
import { setSourcesFilter } from "./set-sources-filter"
import { stackFullnessFilter } from "./stack-fullness-filter"
import { stockThresholdFilter } from "./stock-threshold-filter"
import { stolenFilter } from "./stolen-filter"
import { targetQuantityFilter } from "./target-quantity-filter"
import { traitsFilter } from "./traits-filter"
import { transmutedFilter } from "./transmuted-filter"
import { valueFilter } from "./value-filter"

export const INVENTORY_RULE_FILTERS: InventoryRuleFilter[] = [
  qualityFilter,
  traitsFilter,
  locationFilter,
  setSourcesFilter,
  levelFilter,
  stolenFilter,
  craftedFilter,
  boundFilter,
  bopTradeableFilter,
  questRelevantFilter,
  lockedFilter,
  reconstructedFilter,
  transmutedFilter,
  knownFilter,
  canInspireFilter,
  canResearchFilter,
  canCompanionEquipFilter,
  neededForTargetCharacterBuildFilter,
  neededForTargetCompanionBuildFilter,
  canUnlockFilter,
  requiredSkillLinesFilter,
  requiredCurseStateFilter,
  canLevelMorphsFilter,
  stackFullnessFilter,
  canOpenFilter,
  canSellFilter,
  canListAtGuildTraderFilter,
  canGiveMaxRewardsFilter,
  allStockedFilter,
  stockThresholdFilter,
  itemNameFilter,
  valueFilter,
  marketValueFilter,
  merchantValueFilter,
  replacementValueFilter,
  keepQuantityFilter,
  targetQuantityFilter,
  potionEffectsFilter,
]
