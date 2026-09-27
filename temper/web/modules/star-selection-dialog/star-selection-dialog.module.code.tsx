"use client"

import { getSubcategory } from "akasha/code/type/narrowing/modules/get-subcategory/get-subcategory.module.code.ts"
import {
  type ChampionPointId,
  type ChampionPointSource,
  championPoints,
} from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import type { FilterableSelectDialogConfig } from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import { FilterableSelectDialog } from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import { capitalize } from "akasha/text/writing/modules/capitalize/capitalize.module.code.ts"
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
  const [selectedItemId, setSelectedItemId] = useState<ChampionPointId>(NO_STAR[constellation])

  const availableStars = useMemo(() => {
    const actualSlottedStars = slottedStars.filter((id) => !id.startsWith("no-"))
    const slottedSet = new Set(actualSlottedStars)

    return slottableIds(constellation)
      .filter((id) => !id.startsWith("no-") && !slottedSet.has(id))
      .map((id): ChampionPointSource => {
        const source = championPoints.list.find((cp) => cp.id === id)
        if (!source) throw new Error(`Champion point ${id} not found`)
        return source
      })
  }, [constellation, slottedStars])

  const Icon = CONSTELLATION_ICONS[constellation]

  const config: FilterableSelectDialogConfig<ChampionPointSource> = useMemo(
    () => ({
      title: `Select ${capitalize(constellation)} Star`,
      searchPlaceholder: "Search stars by name or description...",
      emptyMessage: "No stars found matching your search.",
      categories: [
        {
          id: "available",
          label: "Available Stars",
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
    [constellation, availableStars, Icon]
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
