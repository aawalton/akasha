"use client"

import {
  type ChampionPointId,
  type ChampionPointSource,
  championPoints,
} from "@akasha/temper-champion-points/champion-point-source"
import { capitalize } from "@akasha/utils-narrow/capitalize"
import { getSubcategory } from "@akasha/utils-narrow/get-subcategory"
import { Hammer, Shield, Swords } from "lucide-react"
import { useMemo, useState } from "react"
import type { FilterableSelectDialogConfig } from "../filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import { FilterableSelectDialog } from "../filterable-select-dialog/filterable-select-dialog.module.code.tsx"

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

const DEFAULT_ITEMS = {
  warfare: championPoints.data["no-warfare-star"],
  fitness: championPoints.data["no-fitness-star"],
  craft: championPoints.data["no-craft-star"],
} as const

const SLOTTABLE_IDS = {
  warfare: getSubcategory(championPoints, "warfare-slottables").ids,
  fitness: getSubcategory(championPoints, "fitness-slottables").ids,
  craft: getSubcategory(championPoints, "craft-slottables").ids,
} as const

export function StarSelectionDialog({
  open,
  onOpenChange,
  constellation,
  slottedStars,
  onSelect,
}: StarSelectionDialogProps) {
  const [selectedItemId, setSelectedItemId] = useState<ChampionPointId>(
    DEFAULT_ITEMS[constellation].id
  )

  const availableStars = useMemo(() => {
    const slottableIds = SLOTTABLE_IDS[constellation]
    const actualSlottedStars = slottedStars.filter((id) => !id.startsWith("no-"))
    const slottedSet = new Set(actualSlottedStars)

    return slottableIds
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
      allItems: [DEFAULT_ITEMS[constellation], ...availableStars],
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
    setSelectedItemId(DEFAULT_ITEMS[constellation].id)
    onOpenChange(false)
  }

  return (
    <FilterableSelectDialog<ChampionPointSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedItemId}
      onSelect={handleSelect}
      defaultItem={DEFAULT_ITEMS[constellation]}
      config={config}
    />
  )
}
