"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { LEVEL_OPTIONS } from "@temper/game-items-rules-core/filters/level-filter"
import { QUALITY_OPTIONS } from "@temper/game-items-rules-core/filters/quality-filter"
import type { ReactNode } from "react"
import { ComparisonOpPicker } from "../comparison-op-picker"
import type { RuleCardState } from "./filter-id"

interface QualityChipProps {
  state: Pick<
    RuleCardState,
    | "qualityValue"
    | "qualityOption"
    | "qualityOp"
    | "handleQualityChange"
    | "handleQualityOpChange"
    | "handleRemoveFilter"
  >
}

export function QualityChip({ state }: QualityChipProps): ReactNode {
  const {
    qualityValue,
    qualityOption,
    qualityOp,
    handleQualityChange,
    handleQualityOpChange,
    handleRemoveFilter,
  } = state

  return (
    <Select value={qualityValue} onValueChange={handleQualityChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant={qualityOption.variant}
          className="shrink-0"
          frontAction={<ComparisonOpPicker value={qualityOp} onChange={handleQualityOpChange} />}
          onRemove={() => handleRemoveFilter("quality")}
          removeLabel="Remove quality filter"
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {QUALITY_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface LevelChipProps {
  state: Pick<
    RuleCardState,
    "levelValue" | "levelOp" | "handleLevelChange" | "handleLevelOpChange" | "handleRemoveFilter"
  >
}

export function LevelChip({ state }: LevelChipProps): ReactNode {
  const { levelValue, levelOp, handleLevelChange, handleLevelOpChange, handleRemoveFilter } = state

  return (
    <Select value={levelValue} onValueChange={handleLevelChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          frontAction={<ComparisonOpPicker value={levelOp} onChange={handleLevelOpChange} />}
          onRemove={() => handleRemoveFilter("level")}
          removeLabel="Remove level filter"
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {LEVEL_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
