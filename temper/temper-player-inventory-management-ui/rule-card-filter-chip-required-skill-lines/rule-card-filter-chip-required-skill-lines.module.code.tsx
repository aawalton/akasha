"use client"

import { Badge } from "@akasha/design-badges/badge"
import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { Text } from "@akasha/design-primitives/text-body"
import type { RequiredSkillLinesCondition } from "@akasha/temper-items-rules-core/required-skill-lines-filter-types"
import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import type { ReactNode } from "react"
import type { useRuleCard } from "../use-rule-card/use-rule-card.module.code.ts"

type RuleCardState = ReturnType<typeof useRuleCard>

interface RuleCardFilterChipRequiredSkillLinesProps {
  state: Pick<
    RuleCardState,
    | "requiredSkillLinesValue"
    | "handleRequiredSkillLineIdsChange"
    | "handleRequiredSkillLinesModeChange"
    | "handleRemoveFilter"
  >
}

const SKILL_LINE_OPTIONS: readonly BadgeToggleGroupItem[] = skillLines.list
  .filter((sl) => sl.esoSkillLineId > 0)
  .slice()
  .sort((a, b) => a.displayOrder - b.displayOrder)
  .map((sl) => ({ value: sl.id, label: sl.name }))

const MODE_OPTIONS: readonly { value: RequiredSkillLinesCondition["mode"]; label: string }[] = [
  { value: "all-maxed", label: "all maxed" },
  { value: "any-not-maxed", label: "any below max" },
]

export function RuleCardFilterChipRequiredSkillLines({
  state,
}: RuleCardFilterChipRequiredSkillLinesProps): ReactNode {
  const {
    requiredSkillLinesValue,
    handleRequiredSkillLineIdsChange,
    handleRequiredSkillLinesModeChange,
    handleRemoveFilter,
  } = state

  const selectedItems: readonly BadgeToggleGroupItem[] = requiredSkillLinesValue.skillLineIds
    .map((id) => SKILL_LINE_OPTIONS.find((o) => o.value === id))
    .filter((opt): opt is BadgeToggleGroupItem => opt !== undefined)

  const triggerLabel =
    selectedItems.length === 0
      ? "Select Skill Lines"
      : `${selectedItems.length} Skill Line${selectedItems.length === 1 ? "" : "s"}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedItems.length > 0 ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("required-skill-lines")}
          removeLabel="Remove required skill lines filter"
        >
          <span>
            {triggerLabel}
            {selectedItems.length > 0 && (
              <>
                {" — "}
                {MODE_OPTIONS.find((o) => o.value === requiredSkillLinesValue.mode)?.label}
              </>
            )}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          Mode
        </Text>
        <Select
          value={requiredSkillLinesValue.mode}
          onValueChange={handleRequiredSkillLinesModeChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MODE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Text variant="hint" className="font-medium">
          Skill Lines
        </Text>
        <BadgeToggleGroup
          items={SKILL_LINE_OPTIONS}
          value={selectedItems}
          onSelect={handleRequiredSkillLineIdsChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}
