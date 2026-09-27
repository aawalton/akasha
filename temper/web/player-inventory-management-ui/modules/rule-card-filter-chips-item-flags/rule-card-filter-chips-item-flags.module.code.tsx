"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import {
  optionsOf,
  useConditionValueOptions,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-value-options/use-condition-value-options.module.code.tsx"
import type { useRuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-card/use-rule-card.module.code.ts"
import type { ReactNode } from "react"

type RuleCardState = ReturnType<typeof useRuleCard>

type ItemFlagChipId = "reconstructed" | "transmuted" | "known"

interface ItemFlagChipProps {
  id: ItemFlagChipId
  state: Pick<
    RuleCardState,
    | "reconstructedValue"
    | "transmutedValue"
    | "knownValue"
    | "handleReconstructedChange"
    | "handleTransmutedChange"
    | "handleKnownChange"
    | "handleRemoveFilter"
  >
}

export function ItemFlagChip({ id, state }: ItemFlagChipProps): ReactNode {
  const {
    reconstructedValue,
    transmutedValue,
    knownValue,
    handleReconstructedChange,
    handleTransmutedChange,
    handleKnownChange,
    handleRemoveFilter,
  } = state
  const values = useConditionValueOptions()
  if (values === null) return null
  const options = optionsOf(values, id)

  switch (id) {
    case "reconstructed":
      return (
        <Select value={reconstructedValue} onValueChange={handleReconstructedChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("reconstructed")}
              removeLabel="Remove reconstructed status filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "transmuted":
      return (
        <Select value={transmutedValue} onValueChange={handleTransmutedChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("transmuted")}
              removeLabel="Remove transmuted status filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "known":
      return (
        <Select value={knownValue} onValueChange={handleKnownChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("known")}
              removeLabel="Remove known status filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    default:
      return assertNever(id)
  }
}
