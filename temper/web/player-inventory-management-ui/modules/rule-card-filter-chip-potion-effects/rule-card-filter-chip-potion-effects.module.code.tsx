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
import { POTION_EFFECTS_OPTIONS } from "akasha/temper/items/rules/core/modules/potion-effects-filter/potion-effects-filter.module.code.ts"
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
import { countEffect } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/count-effect.temper-rule-card-phrase.ts"
import { countEffects } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/count-effects.temper-rule-card-phrase.ts"
import { effectsHeading } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/effects-heading.temper-rule-card-phrase.ts"
import { modeHeading } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/mode-heading.temper-rule-card-phrase.ts"
import { selectEffects } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/select-effects.temper-rule-card-phrase.ts"
import type { ReactNode } from "react"

type RuleCardState = ReturnType<typeof useRuleCard>

interface RuleCardFilterChipPotionEffectsProps {
  state: Pick<
    RuleCardState,
    | "potionEffectsValue"
    | "handlePotionEffectsChange"
    | "handlePotionEffectsModeChange"
    | "handleRemoveFilter"
  >
}

const EFFECT_OPTIONS: readonly BadgeToggleGroupItem[] = POTION_EFFECTS_OPTIONS.map((o) => ({
  value: o.value,
  label: o.label,
}))

const MODE_FIELD = "potion-effects-mode"

export function RuleCardFilterChipPotionEffects({
  state,
}: RuleCardFilterChipPotionEffectsProps): ReactNode {
  const {
    potionEffectsValue,
    handlePotionEffectsChange,
    handlePotionEffectsModeChange,
    handleRemoveFilter,
  } = state
  const removeLabel = useRemoveFilterLabel()
  const phrases = useRuleCardPhrases()
  const values = useConditionValueOptions()
  const modeOptions = values === null ? [] : optionsOf(values, MODE_FIELD)

  const selectedItems: readonly BadgeToggleGroupItem[] = potionEffectsValue.effects
    .map((id) => EFFECT_OPTIONS.find((o) => o.value === id))
    .filter((opt): opt is BadgeToggleGroupItem => opt !== undefined)

  const triggerLabel =
    phrases === null
      ? ""
      : selectedItems.length === 0
        ? titleIn(phrases, selectEffects.key)
        : phraseOf(phrases, selectedItems.length === 1 ? countEffect.key : countEffects.key, {
            count: String(selectedItems.length),
          })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedItems.length > 0 ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("potion-effects")}
          removeLabel={removeLabel?.("potion-effects")}
        >
          <span>
            {triggerLabel}
            {selectedItems.length > 0 && (
              <>
                {" — "}
                {modeOptions.find((o) => o.value === potionEffectsValue.mode)?.label}
              </>
            )}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          {titleIn(phrases, modeHeading.key)}
        </Text>
        <Select value={potionEffectsValue.mode} onValueChange={handlePotionEffectsModeChange}>
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
          {titleIn(phrases, effectsHeading.key)}
        </Text>
        <BadgeToggleGroup
          items={EFFECT_OPTIONS}
          value={selectedItems}
          onSelect={handlePotionEffectsChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}
