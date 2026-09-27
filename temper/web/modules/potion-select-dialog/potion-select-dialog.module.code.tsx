"use client"

import {
  type PotionId,
  type PotionSource,
  potionAt,
  potions,
} from "akasha/temper/catalog/alchemy/modules/potion-source/potion-source.module.code.ts"
import { convertIconPathToUrl } from "akasha/temper/player/character/characters-equipment/modules/get-equipment-icon/get-equipment-icon.module.code.ts"
import { EquipmentIcon } from "akasha/temper/web/characters-equipment-ui/modules/equipment-icon/equipment-icon.module.code.tsx"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogConfig,
} from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import { useMemo } from "react"

interface PotionSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPotionId: PotionId
  onSelect: (potionId: PotionId) => void
}

export function PotionSelectDialog({
  open,
  onOpenChange,
  selectedPotionId,
  onSelect,
}: PotionSelectDialogProps) {
  const held = potions()
  const noPotion = potionAt("no-potion")
  const config: FilterableSelectDialogConfig<PotionSource> = useMemo(() => {
    const byName = held.list.toSorted((a, b) => a.name.localeCompare(b.name))
    const crown = byName.filter((one) => one.subcategoryId === "crown")
    const dropped = byName.filter((one) => one.subcategoryId === "dropped")
    const crafted = byName.filter((one) => one.subcategoryId === "crafted")
    return {
      title: "Select Potion",
      searchPlaceholder: "Search potions...",
      emptyMessage: "No potions found.",
      categories: [
        { id: "crown" as const, label: "Crown Potions", items: crown },
        { id: "dropped" as const, label: "Dropped Potions", items: dropped },
        { id: "crafted" as const, label: "Crafted Potions", items: crafted },
      ],
      allItems: [noPotion, ...crown, ...dropped, ...crafted],
      defaultItem: noPotion,
      filterItem: (item, searchTerm) => {
        const lower = searchTerm.toLowerCase()
        return (
          item.name.toLowerCase().includes(lower) || item.description.toLowerCase().includes(lower)
        )
      },
      renderIcon: (item) => {
        const iconUrl = convertIconPathToUrl(item.icon)
        return iconUrl != null ? (
          <EquipmentIcon primarySrc={iconUrl} alt={item.name} size={40} />
        ) : null
      },
    }
  }, [held, noPotion])

  const handleSelect = (itemId: PotionId) => {
    onSelect(itemId)
  }

  return (
    <FilterableSelectDialog<PotionSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedPotionId}
      onSelect={handleSelect}
      defaultItem={noPotion}
      config={config}
    />
  )
}
