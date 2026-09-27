"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { LEVEL_OPTIONS } from "akasha/temper/items/rules/core/modules/level-filter/level-filter.module.code.ts"
import { qualityOptions } from "akasha/temper/items/rules/core/modules/rule-quality-filter/rule-quality-filter.module.code.ts"
import { ComparisonOpPicker } from "akasha/temper/web/player-inventory-management-ui/modules/comparison-op-picker/comparison-op-picker.module.code.tsx"
import type { RuleCardState } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-filter-chips-item-filter-id/rule-card-filter-chips-item-filter-id.module.code.ts"
import {
  phraseOf,
  useRemoveFilterLabel,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import type { ReactNode } from "react"

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
  const removeLabel = useRemoveFilterLabel()

  return (
    <Select value={qualityValue} onValueChange={handleQualityChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant={qualityOption.variant}
          className="shrink-0"
          frontAction={<ComparisonOpPicker value={qualityOp} onChange={handleQualityOpChange} />}
          onRemove={() => handleRemoveFilter("quality")}
          removeLabel={removeLabel?.("quality")}
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {qualityOptions().map((opt) => (
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
  const phrases = useRuleCardPhrases()
  const removeLabel = useRemoveFilterLabel()
  if (phrases === null) return null

  return (
    <Select value={levelValue} onValueChange={handleLevelChange}>
      <SelectTrigger hideChevron>
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          frontAction={<ComparisonOpPicker value={levelOp} onChange={handleLevelOpChange} />}
          onRemove={() => handleRemoveFilter("level")}
          removeLabel={removeLabel?.("level")}
        >
          <SelectValue />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {LEVEL_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {phraseOf(phrases, opt.phraseKey, { level: String(opt.level) })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
