"use client"

import { Badge } from "@akasha/design-badges/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { Text } from "@akasha/design-primitives/text-body"
import type { ReactNode } from "react"
import type { useRuleCard } from "../use-rule-card/use-rule-card.module.code.ts"

type RuleCardState = ReturnType<typeof useRuleCard>

interface RuleCardFilterChipCanLevelMorphsProps {
  state: Pick<RuleCardState, "handleRemoveFilter">
}

export function RuleCardFilterChipCanLevelMorphs({
  state,
}: RuleCardFilterChipCanLevelMorphsProps): ReactNode {
  const { handleRemoveFilter } = state

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant="accent"
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("can-level-morphs")}
          removeLabel="Remove can level morphs filter"
        >
          <span>Can Level Morphs</span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          Can Level Morphs
        </Text>
        <Text variant="prose">
          Per-character readiness predicate. The character passes when it has unmaxed morphable
          skills (any morph pair where the current rank is below the maximum). Used at allocation
          time to gate per-character stock distribution.
        </Text>
      </PopoverContent>
    </Popover>
  )
}
