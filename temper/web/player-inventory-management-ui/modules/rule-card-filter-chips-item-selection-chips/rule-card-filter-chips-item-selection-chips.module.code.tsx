"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { BadgeToggleGroup } from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interface/primitive/modules/popover/popover.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { temperBag } from "akasha/temper/catalog/world/temper-bag/temper-bag.page-type.ts"
import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import { locationOptions } from "akasha/temper/items/rules/core/modules/location-filter/location-filter.module.code.ts"
import { setSourceTypeOptions } from "akasha/temper/items/rules/core/modules/set-sources-filter/set-sources-filter.module.code.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import type { RuleCardState } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-filter-chips-item-filter-id/rule-card-filter-chips-item-filter-id.module.code.ts"
import {
  phraseOf,
  type RuleCardPhrases,
  useRemoveFilterLabel,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import {
  titleOfFilter,
  useConditionFieldTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-field-titles/use-condition-field-titles.module.code.tsx"
import { type ReactNode, useMemo } from "react"

function chosenOf(
  phrases: RuleCardPhrases,
  count: number,
  keys: { none: string; one: string; many: string }
): string {
  if (count === 0) return phraseOf(phrases, keys.none)
  return phraseOf(phrases, count === 1 ? keys.one : keys.many, { count: String(count) })
}

interface TraitsChipProps {
  state: Pick<
    RuleCardState,
    "traitOptions" | "selectedTraitItems" | "handleTraitChange" | "handleRemoveFilter"
  >
}

export function TraitsChip({ state }: TraitsChipProps): ReactNode {
  const { traitOptions, selectedTraitItems, handleTraitChange, handleRemoveFilter } = state
  const phrases = useRuleCardPhrases()
  const removeLabel = useRemoveFilterLabel()
  const titles = useConditionFieldTitles()
  if (phrases === null || titles === null) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedTraitItems.length > 0 ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("traits")}
          removeLabel={removeLabel?.("traits")}
        >
          <span>
            {chosenOf(phrases, selectedTraitItems.length, {
              none: "select-traits",
              one: "count-trait",
              many: "count-traits",
            })}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          {titleOfFilter(titles, "traits")}
        </Text>
        <BadgeToggleGroup
          items={traitOptions}
          value={selectedTraitItems}
          onSelect={handleTraitChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}

interface SetSourcesChipProps {
  state: Pick<
    RuleCardState,
    "selectedSetSourceItems" | "handleSetSourceTypesChange" | "handleRemoveFilter"
  >
}

export function SetSourcesChip({ state }: SetSourcesChipProps): ReactNode {
  const { selectedSetSourceItems, handleSetSourceTypesChange, handleRemoveFilter } = state
  const phrases = useRuleCardPhrases()
  const removeLabel = useRemoveFilterLabel()
  const titles = useConditionFieldTitles()
  if (phrases === null || titles === null) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedSetSourceItems.length > 0 ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("set-sources")}
          removeLabel={removeLabel?.("set-sources")}
        >
          <span>
            {chosenOf(phrases, selectedSetSourceItems.length, {
              none: "select-set-sources",
              one: "count-set-source",
              many: "count-set-sources",
            })}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          {titleOfFilter(titles, "set-sources")}
        </Text>
        <BadgeToggleGroup
          items={setSourceTypeOptions()}
          value={selectedSetSourceItems}
          onSelect={handleSetSourceTypesChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}

interface LocationChipProps {
  state: Pick<
    RuleCardState,
    "selectedLocationItems" | "handleLocationChange" | "handleRemoveFilter"
  >
}

export function LocationChip({ state }: LocationChipProps): ReactNode {
  const { selectedLocationItems, handleLocationChange, handleRemoveFilter } = state
  const places = useKeyedTitles(temperLocationType.slug)
  const bags = useKeyedTitles(temperBag.slug)
  const options = useMemo(() => locationOptions(), [places, bags])
  const phrases = useRuleCardPhrases()
  const removeLabel = useRemoveFilterLabel()
  if (phrases === null) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedLocationItems.length > 0 ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("location")}
          removeLabel={removeLabel?.("location")}
        >
          <span>
            {chosenOf(phrases, selectedLocationItems.length, {
              none: "select-locations",
              one: "count-location",
              many: "count-locations",
            })}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          {phraseOf(phrases, "locations-heading")}
        </Text>
        <BadgeToggleGroup
          items={options}
          value={selectedLocationItems}
          onSelect={handleLocationChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}
