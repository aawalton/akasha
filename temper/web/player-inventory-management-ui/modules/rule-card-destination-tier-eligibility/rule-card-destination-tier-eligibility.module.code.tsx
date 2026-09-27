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
import { Switch } from "akasha/design/interface/primitive/modules/switch-control/switch-control.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { CanLevelMorphsCondition } from "akasha/temper/items/rules/core/modules/can-level-morphs-filter-types/can-level-morphs-filter-types.module.code.ts"
import type { CharEligibility } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  RequiredSkillLinesCondition,
  RequiredSkillLinesMode,
} from "akasha/temper/items/rules/core/modules/required-skill-lines-filter-types/required-skill-lines-filter-types.module.code.ts"
import { skillLineOptions } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-filter-chip-required-skill-lines/rule-card-filter-chip-required-skill-lines.module.code.tsx"
import {
  phraseOf,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import {
  titleOfFilter,
  useConditionFieldTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-field-titles/use-condition-field-titles.module.code.tsx"
import {
  optionsOf,
  useConditionValueOptions,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-value-options/use-condition-value-options.module.code.tsx"
import { ruleCardDestinationTierEligibilityActive } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-eligibility-active.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierEligibilityAdd } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-eligibility-add.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierEligibilityCanLevel } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-eligibility-can-level.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierEligibilityModeHeading } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-eligibility-mode-heading.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierEligibilitySkillLine } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-eligibility-skill-line.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierEligibilitySkillLines } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-eligibility-skill-lines.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierEligibilityToggleCanLevel } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-eligibility-toggle-can-level.temper-rule-card-phrase.ts"
import type { ReactNode } from "react"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

function isEligibilityEmpty(eligibility: CharEligibility | undefined): boolean {
  if (eligibility === undefined) return true
  const hasSkillLines =
    eligibility.requiredSkillLines !== undefined &&
    eligibility.requiredSkillLines.skillLineIds.length > 0
  const hasCanLevel = eligibility.canLevelMorphs !== undefined
  return !hasSkillLines && !hasCanLevel
}

function withRequiredSkillLines(
  eligibility: CharEligibility | undefined,
  next: RequiredSkillLinesCondition | undefined
): CharEligibility | undefined {
  const merged: CharEligibility = {
    ...eligibility,
    ...(next !== undefined ? { requiredSkillLines: next } : { requiredSkillLines: undefined }),
  }
  return isEligibilityEmpty(merged) ? undefined : merged
}

function withCanLevelMorphs(
  eligibility: CharEligibility | undefined,
  next: CanLevelMorphsCondition | undefined
): CharEligibility | undefined {
  const merged: CharEligibility = {
    ...eligibility,
    ...(next !== undefined ? { canLevelMorphs: next } : { canLevelMorphs: undefined }),
  }
  return isEligibilityEmpty(merged) ? undefined : merged
}

interface RuleCardDestinationTierEligibilityProps {
  charEligibility: CharEligibility | undefined
  onChange: (next: CharEligibility | undefined) => void
}

export function RuleCardDestinationTierEligibility({
  charEligibility,
  onChange,
}: RuleCardDestinationTierEligibilityProps): ReactNode {
  const requiredSkillLines = charEligibility?.requiredSkillLines
  const canLevelMorphs = charEligibility?.canLevelMorphs
  const options = skillLineOptions()
  const phrases = useRuleCardPhrases()
  const fields = useConditionFieldTitles()
  const values = useConditionValueOptions()
  const modeOptions = values === null ? [] : optionsOf(values, "required-skill-lines")
  const canLevelTitle = fields === null ? "" : titleOfFilter(fields, "can-level-morphs")
  const skillLinesTitle = fields === null ? "" : titleOfFilter(fields, "required-skill-lines")
  const phrased = (key: string, fills: Readonly<Record<string, string>> = {}): string =>
    phrases === null ? "" : phraseOf(phrases, key, fills)

  const selectedItems: readonly BadgeToggleGroupItem[] =
    requiredSkillLines?.skillLineIds
      .map((id) => options.find((o) => o.value === id))
      .filter((opt): opt is BadgeToggleGroupItem => opt !== undefined) ?? []

  const isActive = !isEligibilityEmpty(charEligibility)

  const summaryParts: string[] = []
  if (canLevelMorphs !== undefined) {
    summaryParts.push(titleIn(phrases, ruleCardDestinationTierEligibilityCanLevel.key))
  }
  if (selectedItems.length > 0) {
    summaryParts.push(
      phrased(
        selectedItems.length === 1
          ? ruleCardDestinationTierEligibilitySkillLine.key
          : ruleCardDestinationTierEligibilitySkillLines.key,
        { count: String(selectedItems.length) }
      )
    )
  }
  const triggerLabel = isActive
    ? phrased(ruleCardDestinationTierEligibilityActive.key, { summary: summaryParts.join(", ") })
    : titleIn(phrases, ruleCardDestinationTierEligibilityAdd.key)

  function handleCanLevelToggle(checked: boolean) {
    const next: CanLevelMorphsCondition | undefined = checked ? { mode: "can-level" } : undefined
    onChange(withCanLevelMorphs(charEligibility, next))
  }

  function handleSkillLineIdsChange(selected: readonly BadgeToggleGroupItem[]) {
    const currentMode: RequiredSkillLinesMode = requiredSkillLines?.mode ?? "all-maxed"
    if (selected.length === 0) {
      onChange(withRequiredSkillLines(charEligibility, undefined))
      return
    }
    const next: RequiredSkillLinesCondition = {
      skillLineIds: selected.map((s) => s.value),
      mode: currentMode,
    }
    onChange(withRequiredSkillLines(charEligibility, next))
  }

  function handleSkillLinesModeChange(value: string) {
    const mode: RequiredSkillLinesMode = value === "any-not-maxed" ? "any-not-maxed" : "all-maxed"
    const ids = requiredSkillLines?.skillLineIds ?? []
    if (ids.length === 0) return
    onChange(withRequiredSkillLines(charEligibility, { skillLineIds: ids, mode }))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={isActive ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
        >
          <span>{triggerLabel}</span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Text variant="hint" className="font-medium">
            {canLevelTitle}
          </Text>
          <Switch
            checked={canLevelMorphs !== undefined}
            onCheckedChange={handleCanLevelToggle}
            aria-label={titleIn(phrases, ruleCardDestinationTierEligibilityToggleCanLevel.key)}
          />
        </div>
        <Text variant="hint" className="font-medium">
          {phrased(ruleCardDestinationTierEligibilityModeHeading.key, { field: skillLinesTitle })}
        </Text>
        <Select
          value={requiredSkillLines?.mode ?? "all-maxed"}
          onValueChange={handleSkillLinesModeChange}
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
          {skillLinesTitle}
        </Text>
        <BadgeToggleGroup
          items={options}
          value={selectedItems}
          onSelect={handleSkillLineIdsChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}
