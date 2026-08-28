"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { KNOWN_OPTIONS } from "@temper/game-items-rules-core/filters/known-filter"
import { RECONSTRUCTED_OPTIONS } from "@temper/game-items-rules-core/filters/reconstructed-filter"
import { TRANSMUTED_OPTIONS } from "@temper/game-items-rules-core/filters/transmuted-filter"
import type { ReactNode } from "react"
import type { useRuleCard } from "./use-rule-card"

type RuleCardState = ReturnType<typeof useRuleCard>

export type ItemFlagChipId = "reconstructed" | "transmuted" | "known"

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
            {RECONSTRUCTED_OPTIONS.map((opt) => (
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
            {TRANSMUTED_OPTIONS.map((opt) => (
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
            {KNOWN_OPTIONS.map((opt) => (
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
