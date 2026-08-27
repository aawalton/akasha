"use client"

import {
  allRaceSources,
  NO_RACE_SOURCE,
  type RaceSource,
  sortedRaces,
} from "@temper/game-characters-character/race-source"
import { EquipmentIcon } from "@temper/game-characters-equipment-ui/equipment-icon"
import { getRaceIconUrl, type RaceId } from "@temper/game-characters-races/races"
import { useMemo } from "react"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogConfig,
} from "@/components/ui/filterable-select-dialog"

interface RaceSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedRaceId: RaceId
  onSelect: (raceId: RaceId) => void
}

export function RaceSelectDialog({
  open,
  onOpenChange,
  selectedRaceId,
  onSelect,
}: RaceSelectDialogProps) {
  const config: FilterableSelectDialogConfig<RaceSource> = useMemo(
    () => ({
      title: "Select Race",
      searchPlaceholder: "Search races...",
      emptyMessage: "No races found.",
      categories: [{ id: "all", label: "Races", items: sortedRaces }],
      allItems: allRaceSources,
      filterItem: (item, searchTerm) => {
        const lower = searchTerm.toLowerCase()
        return (
          item.name.toLowerCase().includes(lower) || item.description.toLowerCase().includes(lower)
        )
      },
      renderIcon: (item) => {
        const iconUrl = getRaceIconUrl(item.id)
        return iconUrl != null ? (
          <EquipmentIcon primarySrc={iconUrl} alt={item.name} size={40} />
        ) : null
      },
    }),
    []
  )

  const handleSelect = (itemId: RaceId) => {
    onSelect(itemId)
  }

  return (
    <FilterableSelectDialog<RaceSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedRaceId}
      onSelect={handleSelect}
      defaultItem={NO_RACE_SOURCE}
      config={config}
    />
  )
}
