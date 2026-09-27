"use client"

import { getSubcategory } from "akasha/code/type/narrowing/modules/get-subcategory/get-subcategory.module.code.ts"
import {
  type ChampionPointId,
  type ChampionPointSource,
  championPoints,
} from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import type { FilterableSelectDialogConfig } from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import { FilterableSelectDialog } from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { starSelectionDialogAvailable } from "akasha/temper/web/phrase/pages/star-selection-dialog-available.temper-web-phrase.ts"
import { starSelectionDialogEmpty } from "akasha/temper/web/phrase/pages/star-selection-dialog-empty.temper-web-phrase.ts"
import { starSelectionDialogSearch } from "akasha/temper/web/phrase/pages/star-selection-dialog-search.temper-web-phrase.ts"
import { starSelectionDialogSelectCraft } from "akasha/temper/web/phrase/pages/star-selection-dialog-select-craft.temper-web-phrase.ts"
import { starSelectionDialogSelectFitness } from "akasha/temper/web/phrase/pages/star-selection-dialog-select-fitness.temper-web-phrase.ts"
import { starSelectionDialogSelectWarfare } from "akasha/temper/web/phrase/pages/star-selection-dialog-select-warfare.temper-web-phrase.ts"
import { Hammer, Shield, Swords } from "lucide-react"
import { useMemo, useState } from "react"

interface StarSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  constellation: "warfare" | "fitness" | "craft"
  slottedStars: readonly ChampionPointId[]
  onSelect: (starId: ChampionPointId) => void
}

const CONSTELLATION_ICONS = {
  warfare: Swords,
  fitness: Shield,
  craft: Hammer,
} as const

const SELECT_PHRASE = {
  warfare: starSelectionDialogSelectWarfare.slug,
  fitness: starSelectionDialogSelectFitness.slug,
  craft: starSelectionDialogSelectCraft.slug,
} as const

const NO_STAR = {
  warfare: "no-warfare-star",
  fitness: "no-fitness-star",
  craft: "no-craft-star",
} as const

type Constellation = StarSelectionDialogProps["constellation"]

function defaultItem(constellation: Constellation): ChampionPointSource {
  const found = championPoints.data[NO_STAR[constellation]]
  if (found === undefined) throw new Error(`no champion star page is \`${NO_STAR[constellation]}\``)
  return found
}

function slottableIds(constellation: Constellation): readonly ChampionPointId[] {
  return getSubcategory(championPoints, `${constellation}-slottables`).ids
}

export function StarSelectionDialog({
  open,
  onOpenChange,
  constellation,
  slottedStars,
  onSelect,
}: StarSelectionDialogProps) {
  const phrase = usePhrase()
  const [selectedItemId, setSelectedItemId] = useState<ChampionPointId>(NO_STAR[constellation])

  const stars = championPoints.list

  const availableStars = useMemo(() => {
    const actualSlottedStars = slottedStars.filter((id) => !id.startsWith("no-"))
    const slottedSet = new Set(actualSlottedStars)

    return slottableIds(constellation)
      .filter((id) => !id.startsWith("no-") && !slottedSet.has(id))
      .map((id): ChampionPointSource => {
        const source = stars.find((cp) => cp.id === id)
        if (!source) throw new Error(`Champion point ${id} not found`)
        return source
      })
  }, [constellation, slottedStars, stars])

  const Icon = CONSTELLATION_ICONS[constellation]

  const config: FilterableSelectDialogConfig<ChampionPointSource> = useMemo(
    () => ({
      title: phrase(SELECT_PHRASE[constellation]),
      searchPlaceholder: phrase(starSelectionDialogSearch.slug),
      emptyMessage: phrase(starSelectionDialogEmpty.slug),
      categories: [
        {
          id: "available",
          label: phrase(starSelectionDialogAvailable.slug),
          items: availableStars,
        },
      ],
      allItems: [defaultItem(constellation), ...availableStars],
      filterItem: (item, searchTerm) => {
        const lowerSearch = searchTerm.toLowerCase()
        return (
          item.name.toLowerCase().includes(lowerSearch) ||
          item.description.toLowerCase().includes(lowerSearch)
        )
      },
      renderIcon: () => <Icon className="h-5 w-5" />,
    }),
    [constellation, availableStars, Icon, phrase]
  )

  const handleSelect = (itemId: ChampionPointId) => {
    onSelect(itemId)
    setSelectedItemId(NO_STAR[constellation])
    onOpenChange(false)
  }

  return (
    <FilterableSelectDialog<ChampionPointSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedItemId}
      onSelect={handleSelect}
      defaultItem={defaultItem(constellation)}
      config={config}
    />
  )
}
