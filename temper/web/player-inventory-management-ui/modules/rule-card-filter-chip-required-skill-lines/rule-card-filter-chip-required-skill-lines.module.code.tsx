"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interface/primitive/modules/popover/popover.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import {
  phraseOf,
  useRemoveFilterLabel,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import {
  optionsOf,
  useConditionValueOptions,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-value-options/use-condition-value-options.module.code.tsx"
import type { useRuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-card/use-rule-card.module.code.ts"
import { countSkillLine } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/count-skill-line.temper-rule-card-phrase.ts"
import { countSkillLines } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/count-skill-lines.temper-rule-card-phrase.ts"
import { modeHeading } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/mode-heading.temper-rule-card-phrase.ts"
import { selectSkillLines } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/select-skill-lines.temper-rule-card-phrase.ts"
import { skillLinesHeading } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/skill-lines-heading.temper-rule-card-phrase.ts"
import type { ReactNode } from "react"

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

export function skillLineOptions(): readonly BadgeToggleGroupItem[] {
  return skillLines.list
    .filter((sl) => sl.esoSkillLineId > 0)
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((sl) => ({ value: sl.id, label: sl.name }))
}

const MODE_FIELD = "required-skill-lines"

export function RuleCardFilterChipRequiredSkillLines({
  state,
}: RuleCardFilterChipRequiredSkillLinesProps): ReactNode {
  const {
    requiredSkillLinesValue,
    handleRequiredSkillLineIdsChange,
    handleRequiredSkillLinesModeChange,
    handleRemoveFilter,
  } = state
  const options = skillLineOptions()
  const removeLabel = useRemoveFilterLabel()
  const phrases = useRuleCardPhrases()
  const values = useConditionValueOptions()
  const modeOptions = values === null ? [] : optionsOf(values, MODE_FIELD)

  const selectedItems: readonly BadgeToggleGroupItem[] = requiredSkillLinesValue.skillLineIds
    .map((id) => options.find((o) => o.value === id))
    .filter((opt): opt is BadgeToggleGroupItem => opt !== undefined)

  const triggerLabel =
    phrases === null
      ? ""
      : selectedItems.length === 0
        ? titleIn(phrases, selectSkillLines.key)
        : phraseOf(phrases, selectedItems.length === 1 ? countSkillLine.key : countSkillLines.key, {
            count: String(selectedItems.length),
          })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedItems.length > 0 ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("required-skill-lines")}
          removeLabel={removeLabel?.("required-skill-lines")}
        >
          <span>
            {triggerLabel}
            {selectedItems.length > 0 && (
              <>
                {" — "}
                {modeOptions.find((o) => o.value === requiredSkillLinesValue.mode)?.label}
              </>
            )}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          {titleIn(phrases, modeHeading.key)}
        </Text>
        <Select
          value={requiredSkillLinesValue.mode}
          onValueChange={handleRequiredSkillLinesModeChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {modeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Text variant="hint" className="font-medium">
          {titleIn(phrases, skillLinesHeading.key)}
        </Text>
        <BadgeToggleGroup
          items={options}
          value={selectedItems}
          onSelect={handleRequiredSkillLineIdsChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}
