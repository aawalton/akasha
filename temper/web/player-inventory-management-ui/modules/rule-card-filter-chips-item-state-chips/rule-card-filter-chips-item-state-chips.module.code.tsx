"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import type { RuleCardState } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-filter-chips-item-filter-id/rule-card-filter-chips-item-filter-id.module.code.ts"
import { FilterLock } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-filter-lock/rule-card-filter-lock.module.code.tsx"
import { useLockReason } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import {
  optionsOf,
  useConditionValueOptions,
  valueLabelOf,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-value-options/use-condition-value-options.module.code.tsx"
import type { ReactNode } from "react"

interface StolenChipProps {
  state: Pick<
    RuleCardState,
    "action" | "displayAction" | "stolenValue" | "handleStolenChange" | "handleRemoveFilter"
  >
}

export function StolenChip({ state }: StolenChipProps): ReactNode {
  const { action, displayAction, stolenValue, handleStolenChange, handleRemoveFilter } = state
  const values = useConditionValueOptions()
  const lockReason = useLockReason()
  if (values === null || lockReason === null) return null

  return displayAction === "fence-launder" ? (
    <Badge variant="elevation-muted" className="shrink-0">
      {valueLabelOf(values, "stolen", stolenValue)}
      <FilterLock reason={lockReason("lock-launder-stolen", "fence-launder", "stolen")} />
    </Badge>
  ) : action === "fence-sell" ? (
    <Badge variant="elevation-muted" className="shrink-0">
      {valueLabelOf(values, "stolen", stolenValue)}
      <FilterLock reason={lockReason("lock-fence-stolen", "fence-sell", "stolen")} />
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
        {optionsOf(values, "stolen").map((opt) => (
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
  const values = useConditionValueOptions()
  if (values === null) return null

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
        {optionsOf(values, "crafted").map((opt) => (
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
  const values = useConditionValueOptions()
  if (values === null) return null

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
        {optionsOf(values, "bound").map((opt) => (
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
  const values = useConditionValueOptions()
  if (values === null) return null

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
        {optionsOf(values, "bop-tradeable").map((opt) => (
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
  const values = useConditionValueOptions()
  if (values === null) return null

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
        {optionsOf(values, "quest-relevant").map((opt) => (
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
  const values = useConditionValueOptions()
  if (values === null) return null

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
        {optionsOf(values, "stack-fullness").map((opt) => (
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
  const values = useConditionValueOptions()
  const lockReason = useLockReason()
  if (values === null || lockReason === null) return null

  return displayAction === "unlock" ? (
    <Badge variant="elevation-muted" className="shrink-0">
      {valueLabelOf(values, "locked", lockedValue)}
      <FilterLock reason={lockReason("lock-unlock-locked", "unlock", "locked")} />
    </Badge>
  ) : displayAction === "lock" ? (
    <Badge variant="elevation-muted" className="shrink-0">
      {valueLabelOf(values, "locked", lockedValue)}
      <FilterLock
        reason={lockReason("lock-lock-not-locked", "lock", "locked", {
          value: valueLabelOf(values, "locked", "not-locked"),
        })}
      />
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
        {optionsOf(values, "locked").map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
