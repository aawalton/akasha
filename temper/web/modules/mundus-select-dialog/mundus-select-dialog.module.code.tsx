"use client"

import {
  getMundusIconUrl,
  type MundusId,
  type MundusSource,
  mundus,
  mundusAt,
} from "akasha/temper/player/character/source/modules/mundus-source/mundus-source.module.code.ts"
import { EquipmentIcon } from "akasha/temper/web/characters-equipment-ui/modules/equipment-icon/equipment-icon.module.code.tsx"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogConfig,
} from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { mundusSelectDialogCategory } from "akasha/temper/web/phrase/pages/mundus-select-dialog-category.temper-web-phrase.ts"
import { mundusSelectDialogEmpty } from "akasha/temper/web/phrase/pages/mundus-select-dialog-empty.temper-web-phrase.ts"
import { mundusSelectDialogSearch } from "akasha/temper/web/phrase/pages/mundus-select-dialog-search.temper-web-phrase.ts"
import { mundusSelectDialogTitle } from "akasha/temper/web/phrase/pages/mundus-select-dialog-title.temper-web-phrase.ts"
import { useMemo } from "react"

interface MundusSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedMundusId: MundusId
  onSelect: (mundusId: MundusId) => void
}

function mundusStones(held: ReturnType<typeof mundus>): MundusSource[] {
  return held.list.filter((m) => m.id !== "no-mundus").sort((a, b) => a.name.localeCompare(b.name))
}

export function getMundusById(id: MundusId | null): MundusSource | undefined {
  if (id == null) return undefined
  return mundus().has(id) ? mundusAt(id) : undefined
}

export function MundusSelectDialog({
  open,
  onOpenChange,
  selectedMundusId,
  onSelect,
}: MundusSelectDialogProps) {
  const held = mundus()
  const phrase = usePhrase()
  const config: FilterableSelectDialogConfig<MundusSource> = useMemo(
    () => ({
      title: phrase(mundusSelectDialogTitle.slug),
      searchPlaceholder: phrase(mundusSelectDialogSearch.slug),
      emptyMessage: phrase(mundusSelectDialogEmpty.slug),
      categories: [
        { id: "all", label: phrase(mundusSelectDialogCategory.slug), items: mundusStones(held) },
      ],
      allItems: [...held.list],
      filterItem: (item, searchTerm) => {
        const lower = searchTerm.toLowerCase()
        return (
          item.name.toLowerCase().includes(lower) || item.description.toLowerCase().includes(lower)
        )
      },
      renderIcon: (item) => {
        const iconUrl = getMundusIconUrl(item.id)
        return iconUrl != null ? (
          <EquipmentIcon primarySrc={iconUrl} alt={item.name} size={40} />
        ) : null
      },
    }),
    [held, phrase]
  )

  const handleSelect = (itemId: MundusId) => {
    onSelect(itemId)
  }

  return (
    <FilterableSelectDialog<MundusSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedMundusId}
      onSelect={handleSelect}
      defaultItem={mundusAt("no-mundus")}
      config={config}
    />
  )
}
