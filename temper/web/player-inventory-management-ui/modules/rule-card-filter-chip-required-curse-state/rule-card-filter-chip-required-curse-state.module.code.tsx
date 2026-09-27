"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
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
import type { RequiredCurseStateCondition } from "akasha/temper/items/rules/core/modules/required-curse-state-filter-types/required-curse-state-filter-types.module.code.ts"
import { curses } from "akasha/temper/player/character/source/modules/curses/curses.module.code.ts"
import {
  useRemoveFilterLabel,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import type { useRuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-card/use-rule-card.module.code.ts"
import { curseStateHeading } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/curse-state-heading.temper-rule-card-phrase.ts"
import { selectCurseState } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/select-curse-state.temper-rule-card-phrase.ts"
import type { ReactNode } from "react"

type RuleCardState = ReturnType<typeof useRuleCard>

interface RuleCardFilterChipRequiredCurseStateProps {
  state: Pick<
    RuleCardState,
    "requiredCurseStateValue" | "handleRequiredCurseStateChange" | "handleRemoveFilter"
  >
}

const CURSE_STATES: readonly RequiredCurseStateCondition["state"][] = ["vampire", "werewolf"]

export function RuleCardFilterChipRequiredCurseState({
  state,
}: RuleCardFilterChipRequiredCurseStateProps): ReactNode {
  const { requiredCurseStateValue, handleRequiredCurseStateChange, handleRemoveFilter } = state
  const removeLabel = useRemoveFilterLabel()
  const phrases = useRuleCardPhrases()
  const selectLabel = titleIn(phrases, selectCurseState.key)
  const held = curses().list
  const stateOptions = CURSE_STATES.map((value) => ({
    value,
    label: held.find((one) => one.id === value)?.name ?? value,
  }))

  const selectedOption = stateOptions.find((o) => o.value === requiredCurseStateValue?.state)
  const triggerLabel = selectedOption?.label ?? selectLabel

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedOption !== undefined ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("required-curse-state")}
          removeLabel={removeLabel?.("required-curse-state")}
        >
          <span>{triggerLabel}</span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          {titleIn(phrases, curseStateHeading.key)}
        </Text>
        <Select
          value={requiredCurseStateValue?.state ?? ""}
          onValueChange={handleRequiredCurseStateChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectLabel} />
          </SelectTrigger>
          <SelectContent>
            {stateOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  )
}
