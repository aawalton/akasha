"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { CAN_COMPANION_EQUIP_OPTIONS } from "@temper/game-items-rules-core/filters/can-companion-equip-filter"
import { CAN_GIVE_MAX_REWARDS_OPTIONS } from "@temper/game-items-rules-core/filters/can-give-max-rewards-filter"
import { CAN_INSPIRE_OPTIONS } from "@temper/game-items-rules-core/filters/can-inspire-filter"
import { CAN_OPEN_OPTIONS } from "@temper/game-items-rules-core/filters/can-open-filter"
import { CAN_RESEARCH_OPTIONS } from "@temper/game-items-rules-core/filters/can-research-filter"
import { CAN_UNLOCK_OPTIONS } from "@temper/game-items-rules-core/filters/can-unlock-filter"
import type { ReactNode } from "react"
import { FilterLock } from "./rule-card-filter-lock"
import type { useRuleCard } from "./use-rule-card"

type RuleCardState = ReturnType<typeof useRuleCard>

export type AbilityFilterId =
  | "can-inspire"
  | "can-research"
  | "can-unlock"
  | "can-open"
  | "can-sell"
  | "can-list-at-guild-trader"
  | "can-give-max-rewards"
  | "can-companion-equip"
  | "needed-for-target-character-build"
  | "needed-for-target-companion-build"

interface RuleCardFilterChipAbilityProps {
  id: AbilityFilterId
  state: Pick<
    RuleCardState,
    | "action"
    | "displayAction"
    | "canInspireValue"
    | "canResearchValue"
    | "canUnlockValue"
    | "canOpenValue"
    | "canGiveMaxRewardsValue"
    | "canCompanionEquipValue"
    | "handleCanInspireChange"
    | "handleCanUnlockChange"
    | "handleCanCompanionEquipChange"
    | "handleCanResearchChange"
    | "handleRemoveFilter"
  >
}

export function RuleCardFilterChipAbility({
  id,
  state,
}: RuleCardFilterChipAbilityProps): ReactNode {
  const {
    action,
    displayAction,
    canInspireValue,
    canResearchValue,
    canUnlockValue,
    canOpenValue,
    canGiveMaxRewardsValue,
    canCompanionEquipValue,
    handleCanInspireChange,
    handleCanResearchChange,
    handleCanUnlockChange,
    handleCanCompanionEquipChange,
    handleRemoveFilter,
  } = state

  switch (id) {
    case "can-inspire":
      return displayAction === "deconstruct" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {CAN_INSPIRE_OPTIONS.find((o) => o.value === canInspireValue)?.label}
          <FilterLock reason="The Deconstruct scope controls this filter. Change the scope to 'For Materials' to remove it." />
        </Badge>
      ) : (
        <Select value={canInspireValue} onValueChange={handleCanInspireChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("can-inspire")}
              removeLabel="Remove can inspire filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {CAN_INSPIRE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "can-research":
      return displayAction === "research" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {CAN_RESEARCH_OPTIONS.find((o) => o.value === canResearchValue)?.label}
          <FilterLock reason="The Research action requires the Can Research filter to ensure only researchable items are sent to crafting stations." />
        </Badge>
      ) : (
        <Select value={canResearchValue} onValueChange={handleCanResearchChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("can-research")}
              removeLabel="Remove can research filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {CAN_RESEARCH_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "can-unlock":
      return displayAction === "use" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {CAN_UNLOCK_OPTIONS.find((o) => o.value === canUnlockValue)?.label}
          <FilterLock reason="The Use action requires the Can Unlock filter to ensure only items that teach something new are consumed." />
        </Badge>
      ) : (
        <Select value={canUnlockValue} onValueChange={handleCanUnlockChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("can-unlock")}
              removeLabel="Remove can unlock filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {CAN_UNLOCK_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "can-open":
      return displayAction === "open" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {CAN_OPEN_OPTIONS.find((o) => o.value === canOpenValue)?.label}
          <FilterLock reason="The Open action requires the Can Open filter to ensure only openable containers are activated." />
        </Badge>
      ) : (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("can-open")}
          removeLabel="Remove can open filter"
        >
          {CAN_OPEN_OPTIONS.find((o) => o.value === canOpenValue)?.label}
        </Badge>
      )

    case "can-sell":
      return action === "fence-sell" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          Can Sell to Merchant
          <FilterLock reason="The Sell to Fence action requires the Can Sell filter because fences only accept items with a vendor sell price." />
        </Badge>
      ) : displayAction === "sell" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          Can Sell to Merchant
          <FilterLock reason="The Sell to Merchant action requires the Can Sell filter to ensure only items with a vendor sell price are sold." />
        </Badge>
      ) : (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("can-sell")}
          removeLabel="Remove can sell filter"
        >
          Can Sell to Merchant
        </Badge>
      )

    case "can-list-at-guild-trader":
      return displayAction === "sell" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          Can List at Guild Trader
          <FilterLock reason="The List at Guild Store action requires the Can List at Guild Trader filter to ensure only items that can be sold on the trading house are listed." />
        </Badge>
      ) : (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("can-list-at-guild-trader")}
          removeLabel="Remove can list at guild trader filter"
        >
          Can List at Guild Trader
        </Badge>
      )

    case "can-give-max-rewards":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("can-give-max-rewards")}
          removeLabel="Remove can give max rewards filter"
        >
          {CAN_GIVE_MAX_REWARDS_OPTIONS.find((o) => o.value === canGiveMaxRewardsValue)?.label}
        </Badge>
      )

    case "can-companion-equip":
      return displayAction === "companion-equip" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {CAN_COMPANION_EQUIP_OPTIONS.find((o) => o.value === canCompanionEquipValue)?.label}
          <FilterLock reason="The Companion Equip action requires the Can Companion Equip filter to ensure only items matching a companion's target build are equipped." />
        </Badge>
      ) : (
        <Select value={canCompanionEquipValue} onValueChange={handleCanCompanionEquipChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("can-companion-equip")}
              removeLabel="Remove can companion equip filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {CAN_COMPANION_EQUIP_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "needed-for-target-character-build":
      return displayAction === "character-equip" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          Needed for Target Character Build
          <FilterLock reason="The Character Equip action requires the Needed for Target Character Build filter to ensure only items needed by a target build are equipped." />
        </Badge>
      ) : (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("needed-for-target-character-build")}
          removeLabel="Remove needed for target character build filter"
        >
          Needed for Target Character Build
        </Badge>
      )

    case "needed-for-target-companion-build":
      return displayAction === "companion-equip" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          Needed for Target Companion Build
          <FilterLock reason="The Companion Equip action requires the Needed for Target Companion Build filter to ensure only items needed by a companion's target build are equipped." />
        </Badge>
      ) : (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("needed-for-target-companion-build")}
          removeLabel="Remove needed for target companion build filter"
        >
          Needed for Target Companion Build
        </Badge>
      )
    default:
      return assertNever(id)
  }
}
