import type { InventoryLocationConditionId } from "@akasha/temper-items-core/location-condition"
import type { ComparisonOpId } from "@akasha/temper-items-rules-core/comparison-op-data"
import type { RequiredCurseStateCondition } from "@akasha/temper-items-rules-core/required-curse-state-filter-types"
import type { RequiredSkillLinesCondition } from "@akasha/temper-items-rules-core/required-skill-lines-filter-types"
import {
  type RuleConstantKey,
  resolveThreshold,
} from "@akasha/temper-items-rules-core/rule-constants"

export function resolveOptionalThreshold(
  v: number | RuleConstantKey | undefined
): number | undefined {
  return v === undefined ? undefined : resolveThreshold(v)
}

export function buildConditions(
  maxQuality?: number,
  qualityOp?: ComparisonOpId,
  traits?: readonly string[],
  setSourceTypes?: readonly string[],
  location?: readonly InventoryLocationConditionId[],
  maxLevel?: number,
  levelOp?: ComparisonOpId,
  stolen?: "stolen" | "not-stolen",
  crafted?: "crafted" | "not-crafted",
  bound?: "bound" | "not-bound",
  bopTradeable?: "bop-tradeable" | "not-bop-tradeable",
  questRelevant?: "quest-relevant" | "not-quest-relevant",
  locked?: "locked" | "not-locked",
  reconstructed?: "reconstructed" | "not-reconstructed",
  transmuted?: "transmuted" | "not-transmuted",
  known?: "known" | "not-known",
  canInspire?: "can-inspire" | "cannot-inspire",
  canResearch?: "can-research" | "cannot-research",
  canUnlock?: "can-unlock" | "cannot-unlock",
  canOpen?: "can-open",
  canSell?: "can-sell",
  canListAtGuildTrader?: "can-list-at-guild-trader",
  canGiveMaxRewards?: "can-give-max-rewards",
  canCompanionEquip?: "can-companion-equip" | "cannot-companion-equip",
  isTargetEquip?: "is-target-equip" | "not-target-equip",
  isTargetCompanionEquip?: "is-target-companion-equip" | "not-target-companion-equip",
  allStocked?: "all-stocked" | "not-all-stocked",
  stockThreshold?: number,
  value?: number,
  valueOp?: ComparisonOpId,
  marketValue?: number,
  marketValueOp?: ComparisonOpId,
  merchantValue?: number,
  merchantValueOp?: ComparisonOpId,
  replacementValue?: number,
  replacementValueOp?: ComparisonOpId,
  keepQuantity?: number,
  targetQuantity?: number,
  itemNamePattern?: string,
  requiredSkillLines?: RequiredSkillLinesCondition,
  requiredCurseState?: RequiredCurseStateCondition,
  stackFullness?: "full" | "partial",
  potionEffects?: readonly string[],
  potionEffectsMode?: "all" | "any"
) {
  const hasQuality = maxQuality != null
  const hasQualityOp = qualityOp != null && qualityOp !== "<="
  const hasTraits = traits != null && traits.length > 0
  const hasSetSourceTypes = setSourceTypes != null && setSourceTypes.length > 0
  const hasLocation = location != null && location.length > 0
  const hasLevel = maxLevel != null
  const hasLevelOp = levelOp != null && levelOp !== "<="
  const hasStolen = stolen != null
  const hasCrafted = crafted != null
  const hasBound = bound != null
  const hasBopTradeable = bopTradeable != null
  const hasQuestRelevant = questRelevant != null
  const hasLocked = locked != null
  const hasReconstructed = reconstructed != null
  const hasTransmuted = transmuted != null
  const hasKnown = known != null
  const hasCanInspire = canInspire != null
  const hasCanResearch = canResearch != null
  const hasCanUnlock = canUnlock != null
  const hasCanOpen = canOpen != null
  const hasCanSell = canSell != null
  const hasCanListAtGuildTrader = canListAtGuildTrader != null
  const hasCanGiveMaxRewards = canGiveMaxRewards != null
  const hasCanCompanionEquip = canCompanionEquip != null
  const hasIsTargetEquip = isTargetEquip != null
  const hasIsTargetCompanionEquip = isTargetCompanionEquip != null
  const hasAllStocked = allStocked != null
  const hasStockThreshold = stockThreshold != null
  const hasValue = value != null
  const hasValueOp = valueOp != null && valueOp !== "<="
  const hasMarketValue = marketValue != null
  const hasMarketValueOp = marketValueOp != null && marketValueOp !== "<="
  const hasMerchantValue = merchantValue != null
  const hasMerchantValueOp = merchantValueOp != null && merchantValueOp !== "<="
  const hasReplacementValue = replacementValue != null
  const hasReplacementValueOp = replacementValueOp != null && replacementValueOp !== "<="
  const hasKeepQuantity = keepQuantity != null
  const hasTargetQuantity = targetQuantity != null
  const hasItemNamePattern = itemNamePattern != null && itemNamePattern.trim().length > 0
  const hasRequiredSkillLines =
    requiredSkillLines != null && requiredSkillLines.skillLineIds.length > 0
  const hasRequiredCurseState = requiredCurseState != null
  const hasStackFullness = stackFullness != null
  const hasPotionEffects = potionEffects != null && potionEffects.length > 0
  const hasPotionEffectsMode = hasPotionEffects && potionEffectsMode != null
  if (
    !hasQuality &&
    !hasQualityOp &&
    !hasTraits &&
    !hasSetSourceTypes &&
    !hasLocation &&
    !hasLevel &&
    !hasLevelOp &&
    !hasStolen &&
    !hasCrafted &&
    !hasBound &&
    !hasBopTradeable &&
    !hasQuestRelevant &&
    !hasLocked &&
    !hasReconstructed &&
    !hasTransmuted &&
    !hasKnown &&
    !hasCanInspire &&
    !hasCanResearch &&
    !hasCanUnlock &&
    !hasCanOpen &&
    !hasCanSell &&
    !hasCanListAtGuildTrader &&
    !hasCanGiveMaxRewards &&
    !hasCanCompanionEquip &&
    !hasIsTargetEquip &&
    !hasIsTargetCompanionEquip &&
    !hasAllStocked &&
    !hasStockThreshold &&
    !hasValue &&
    !hasValueOp &&
    !hasMarketValue &&
    !hasMarketValueOp &&
    !hasMerchantValue &&
    !hasMerchantValueOp &&
    !hasReplacementValue &&
    !hasReplacementValueOp &&
    !hasKeepQuantity &&
    !hasTargetQuantity &&
    !hasItemNamePattern &&
    !hasRequiredSkillLines &&
    !hasRequiredCurseState &&
    !hasStackFullness &&
    !hasPotionEffects
  )
    return undefined
  return {
    ...(hasQuality ? { maxQuality } : {}),
    ...(hasQualityOp ? { qualityOp } : {}),
    ...(hasTraits ? { traits } : {}),
    ...(hasSetSourceTypes ? { setSourceTypes } : {}),
    ...(hasLocation ? { location } : {}),
    ...(hasLevel ? { maxLevel } : {}),
    ...(hasLevelOp ? { levelOp } : {}),
    ...(hasStolen ? { stolen } : {}),
    ...(hasCrafted ? { crafted } : {}),
    ...(hasBound ? { bound } : {}),
    ...(hasBopTradeable ? { bopTradeable } : {}),
    ...(hasQuestRelevant ? { questRelevant } : {}),
    ...(hasLocked ? { locked } : {}),
    ...(hasReconstructed ? { reconstructed } : {}),
    ...(hasTransmuted ? { transmuted } : {}),
    ...(hasKnown ? { known } : {}),
    ...(hasCanInspire ? { canInspire } : {}),
    ...(hasCanResearch ? { canResearch } : {}),
    ...(hasCanUnlock ? { canUnlock } : {}),
    ...(hasCanOpen ? { canOpen } : {}),
    ...(hasCanSell ? { canSell } : {}),
    ...(hasCanListAtGuildTrader ? { canListAtGuildTrader } : {}),
    ...(hasCanGiveMaxRewards ? { canGiveMaxRewards } : {}),
    ...(hasCanCompanionEquip ? { canCompanionEquip } : {}),
    ...(hasIsTargetEquip ? { isTargetEquip } : {}),
    ...(hasIsTargetCompanionEquip ? { isTargetCompanionEquip } : {}),
    ...(hasAllStocked ? { allStocked } : {}),
    ...(hasStockThreshold ? { stockThreshold } : {}),
    ...(hasValue ? { value } : {}),
    ...(hasValueOp ? { valueOp } : {}),
    ...(hasMarketValue ? { marketValue } : {}),
    ...(hasMarketValueOp ? { marketValueOp } : {}),
    ...(hasMerchantValue ? { merchantValue } : {}),
    ...(hasMerchantValueOp ? { merchantValueOp } : {}),
    ...(hasReplacementValue ? { replacementValue } : {}),
    ...(hasReplacementValueOp ? { replacementValueOp } : {}),
    ...(hasKeepQuantity ? { keepQuantity } : {}),
    ...(hasTargetQuantity ? { targetQuantity } : {}),
    ...(hasItemNamePattern ? { itemNamePattern } : {}),
    ...(hasRequiredSkillLines ? { requiredSkillLines } : {}),
    ...(hasRequiredCurseState ? { requiredCurseState } : {}),
    ...(hasStackFullness ? { stackFullness } : {}),
    ...(hasPotionEffects ? { potionEffects } : {}),
    ...(hasPotionEffectsMode ? { potionEffectsMode } : {}),
  }
}
