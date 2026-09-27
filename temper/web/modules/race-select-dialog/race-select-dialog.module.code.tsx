"use client"

import { getRaceIconUrl } from "akasha/temper/catalog/character-race/modules/race-icon-url/race-icon-url.module.code.ts"
import {
  type RaceId,
  races,
} from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import {
  allRaceSources,
  NO_RACE_SOURCE,
  type RaceSource,
  sortedRaces,
} from "akasha/temper/player/character/build/modules/race-source/race-source.module.code.ts"
import { EquipmentIcon } from "akasha/temper/web/characters-equipment-ui/modules/equipment-icon/equipment-icon.module.code.tsx"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogConfig,
} from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import {
  phraseIn,
  useWebPhrases,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { raceSelectDialogEmpty } from "akasha/temper/web/phrase/pages/race-select-dialog-empty.temper-web-phrase.ts"
import { raceSelectDialogRaces } from "akasha/temper/web/phrase/pages/race-select-dialog-races.temper-web-phrase.ts"
import { raceSelectDialogSearch } from "akasha/temper/web/phrase/pages/race-select-dialog-search.temper-web-phrase.ts"
import { raceSelectDialogTitle } from "akasha/temper/web/phrase/pages/race-select-dialog-title.temper-web-phrase.ts"
import { useMemo } from "react"

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
  const sorted = sortedRaces()
  const noRaceName = races.data[NO_RACE_SOURCE.id].name
  const noRaceSource = useMemo(() => ({ ...NO_RACE_SOURCE, name: noRaceName }), [noRaceName])
  const sources = allRaceSources()
  const all = useMemo(
    () => sources.map((source) => (source.id === noRaceSource.id ? noRaceSource : source)),
    [sources, noRaceSource]
  )
  const phrases = useWebPhrases()
  const config: FilterableSelectDialogConfig<RaceSource> = useMemo(
    () => ({
      title: phraseIn(phrases, raceSelectDialogTitle.slug),
      searchPlaceholder: phraseIn(phrases, raceSelectDialogSearch.slug),
      emptyMessage: phraseIn(phrases, raceSelectDialogEmpty.slug),
      categories: [
        { id: "all", label: phraseIn(phrases, raceSelectDialogRaces.slug), items: sorted },
      ],
      allItems: all,
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
    [sorted, all, phrases]
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
      defaultItem={noRaceSource}
      config={config}
    />
  )
}
