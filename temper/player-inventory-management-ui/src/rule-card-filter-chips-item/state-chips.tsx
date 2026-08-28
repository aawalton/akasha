"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { BOP_TRADEABLE_OPTIONS } from "@temper/game-items-rules-core/filters/bop-tradeable-filter"
import { BOUND_OPTIONS } from "@temper/game-items-rules-core/filters/bound-filter"
import { CRAFTED_OPTIONS } from "@temper/game-items-rules-core/filters/crafted-filter"
import { LOCKED_OPTIONS } from "@temper/game-items-rules-core/filters/locked-filter"
import { QUEST_RELEVANT_OPTIONS } from "@temper/game-items-rules-core/filters/quest-relevant-filter"
import { STACK_FULLNESS_OPTIONS } from "@temper/game-items-rules-core/filters/stack-fullness-filter"
import { STOLEN_OPTIONS } from "@temper/game-items-rules-core/filters/stolen-filter"
import type { ReactNode } from "react"
import { FilterLock } from "../rule-card-filter-lock"
import type { RuleCardState } from "./filter-id"

interface StolenChipProps {
  state: Pick<
    RuleCardState,
    "action" | "displayAction" | "stolenValue" | "handleStolenChange" | "handleRemoveFilter"
  >
}

export function StolenChip({ state }: StolenChipProps): ReactNode {
  const { action, displayAction, stolenValue, handleStolenChange, handleRemoveFilter } = state

  return displayAction === "fence-launder" ? (
    <Badge variant="elevation-muted" className="shrink-0">
      {STOLEN_OPTIONS.find((o) => o.value === stolenValue)?.label}
      <FilterLock reason="The Launder action requires the Stolen filter because only stolen items can be laundered at a fence." />
    </Badge>
  ) : action === "fence-sell" ? (
    <Badge variant="elevation-muted" className="shrink-0">
      {STOLEN_OPTIONS.find((o) => o.value === stolenValue)?.label}
      <FilterLock reason="The Sell to Fence action requires the Stolen filter because only stolen items can be sold at a fence." />
    </Badge>
  ) : (
    <Select value={stolenValue} onValueChange={handleStolenChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("stolen")}
          removeLabel="Remove stolen status filter"
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {STOLEN_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface CraftedChipProps {
  state: Pick<RuleCardState, "craftedValue" | "handleCraftedChange" | "handleRemoveFilter">
}

export function CraftedChip({ state }: CraftedChipProps): ReactNode {
  const { craftedValue, handleCraftedChange, handleRemoveFilter } = state

  return (
    <Select value={craftedValue} onValueChange={handleCraftedChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("crafted")}
          removeLabel="Remove crafted status filter"
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {CRAFTED_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface BoundChipProps {
  state: Pick<RuleCardState, "boundValue" | "handleBoundChange" | "handleRemoveFilter">
}

export function BoundChip({ state }: BoundChipProps): ReactNode {
  const { boundValue, handleBoundChange, handleRemoveFilter } = state

  return (
    <Select value={boundValue} onValueChange={handleBoundChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("bound")}
          removeLabel="Remove bound status filter"
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {BOUND_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface BopTradeableChipProps {
  state: Pick<
    RuleCardState,
    "bopTradeableValue" | "handleBopTradeableChange" | "handleRemoveFilter"
  >
}

export function BopTradeableChip({ state }: BopTradeableChipProps): ReactNode {
  const { bopTradeableValue, handleBopTradeableChange, handleRemoveFilter } = state

  return (
    <Select value={bopTradeableValue} onValueChange={handleBopTradeableChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("bop-tradeable")}
          removeLabel="Remove BoP-tradeable status filter"
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {BOP_TRADEABLE_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface QuestRelevantChipProps {
  state: Pick<
    RuleCardState,
    "questRelevantValue" | "handleQuestRelevantChange" | "handleRemoveFilter"
  >
}

export function QuestRelevantChip({ state }: QuestRelevantChipProps): ReactNode {
  const { questRelevantValue, handleQuestRelevantChange, handleRemoveFilter } = state

  return (
    <Select value={questRelevantValue} onValueChange={handleQuestRelevantChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("quest-relevant")}
          removeLabel="Remove quest-relevant status filter"
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {QUEST_RELEVANT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface StackFullnessChipProps {
  state: Pick<
    RuleCardState,
    "stackFullnessValue" | "handleStackFullnessChange" | "handleRemoveFilter"
  >
}

export function StackFullnessChip({ state }: StackFullnessChipProps): ReactNode {
  const { stackFullnessValue, handleStackFullnessChange, handleRemoveFilter } = state

  return (
    <Select value={stackFullnessValue} onValueChange={handleStackFullnessChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("stack-fullness")}
          removeLabel="Remove stack fullness filter"
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {STACK_FULLNESS_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface LockedChipProps {
  state: Pick<
    RuleCardState,
    "displayAction" | "lockedValue" | "handleLockedChange" | "handleRemoveFilter"
  >
}

export function LockedChip({ state }: LockedChipProps): ReactNode {
  const { displayAction, lockedValue, handleLockedChange, handleRemoveFilter } = state

  return displayAction === "unlock" ? (
    <Badge variant="elevation-muted" className="shrink-0">
      {LOCKED_OPTIONS.find((o) => o.value === lockedValue)?.label}
      <FilterLock reason="The Unlock action requires the Locked filter because only locked items can be unlocked." />
    </Badge>
  ) : displayAction === "lock" ? (
    <Badge variant="elevation-muted" className="shrink-0">
      {LOCKED_OPTIONS.find((o) => o.value === lockedValue)?.label}
      <FilterLock reason="The Lock action requires the Not Locked filter because only unlocked items can be locked." />
    </Badge>
  ) : (
    <Select value={lockedValue} onValueChange={handleLockedChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("locked")}
          removeLabel="Remove lock status filter"
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {LOCKED_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
