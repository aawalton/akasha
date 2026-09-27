"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interface/primitive/modules/popover/popover.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { usePhraseDescription } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { ruleCardFilterChipCanLevelMorphsNote } from "akasha/temper/web/phrase/pages/rule-card-filter-chip-can-level-morphs-note.temper-web-phrase.ts"
import { useRemoveFilterLabel } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import {
  titleOfFilter,
  useConditionFieldTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-field-titles/use-condition-field-titles.module.code.tsx"
import type { useRuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-card/use-rule-card.module.code.ts"
import type { ReactNode } from "react"

type RuleCardState = ReturnType<typeof useRuleCard>

interface RuleCardFilterChipCanLevelMorphsProps {
  state: Pick<RuleCardState, "handleRemoveFilter">
}

export function RuleCardFilterChipCanLevelMorphs({
  state,
}: RuleCardFilterChipCanLevelMorphsProps): ReactNode {
  const { handleRemoveFilter } = state
  const removeLabel = useRemoveFilterLabel()
  const fields = useConditionFieldTitles()
  const description = usePhraseDescription()
  const title = fields === null ? "" : titleOfFilter(fields, "can-level-morphs")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant="accent"
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("can-level-morphs")}
          removeLabel={removeLabel?.("can-level-morphs")}
        >
          <span>{title}</span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          {title}
        </Text>
        <Text variant="prose">{description(ruleCardFilterChipCanLevelMorphsNote.slug)}</Text>
      </PopoverContent>
    </Popover>
  )
}
