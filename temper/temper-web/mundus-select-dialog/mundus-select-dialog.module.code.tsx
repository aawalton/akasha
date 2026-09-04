"use client"

import {
  getMundusIconUrl,
  type MundusId,
  type MundusSource,
  mundus,
} from "@akasha/temper-character-sources/mundus-source"
import { EquipmentIcon } from "@akasha/temper-characters-equipment-ui/equipment-icon"
import { useMemo } from "react"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogConfig,
} from "../filterable-select-dialog/filterable-select-dialog.module.code.tsx"

interface MundusSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedMundusId: MundusId
  onSelect: (mundusId: MundusId) => void
}

const MUNDUS_STONES: MundusSource[] = mundus.list
  .filter((m) => m.id !== "no-mundus")
  .sort((a, b) => a.name.localeCompare(b.name))

export function getMundusById(id: MundusId | null): MundusSource | undefined {
  if (id == null) return undefined
  return mundus.has(id) ? mundus.data[id] : undefined
}

export function MundusSelectDialog({
  open,
  onOpenChange,
  selectedMundusId,
  onSelect,
}: MundusSelectDialogProps) {
  const config: FilterableSelectDialogConfig<MundusSource> = useMemo(
    () => ({
      title: "Select Mundus Stone",
      searchPlaceholder: "Search mundus stones...",
      emptyMessage: "No mundus stones found.",
      categories: [{ id: "all", label: "Mundus Stones", items: MUNDUS_STONES }],
      allItems: mundus.list,
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
    []
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
      defaultItem={mundus.data["no-mundus"]}
      config={config}
    />
  )
}
