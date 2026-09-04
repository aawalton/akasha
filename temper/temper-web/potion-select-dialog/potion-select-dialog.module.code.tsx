"use client"

import { type PotionId, type PotionSource, potions } from "@akasha/temper-alchemy/potion-source"
import { convertIconPathToUrl } from "@akasha/temper-characters-equipment/get-equipment-icon"
import { EquipmentIcon } from "@akasha/temper-characters-equipment-ui/equipment-icon"
import { getSubcategory } from "@akasha/utils-narrow/get-subcategory"
import { useMemo } from "react"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogConfig,
} from "../filterable-select-dialog/filterable-select-dialog.module.code.tsx"

interface PotionSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPotionId: PotionId
  onSelect: (potionId: PotionId) => void
}

const NO_POTION = potions.data["no-potion"]

const CROWN_POTIONS = [...getSubcategory(potions, "crown").list].sort((a, b) =>
  a.name.localeCompare(b.name)
)

const DROPPED_POTIONS = [...getSubcategory(potions, "dropped").list].sort((a, b) =>
  a.name.localeCompare(b.name)
)

const CRAFTED_POTIONS = [...getSubcategory(potions, "crafted").list].sort((a, b) =>
  a.name.localeCompare(b.name)
)

const ALL_POTIONS = [NO_POTION, ...CROWN_POTIONS, ...DROPPED_POTIONS, ...CRAFTED_POTIONS]

export function PotionSelectDialog({
  open,
  onOpenChange,
  selectedPotionId,
  onSelect,
}: PotionSelectDialogProps) {
  const config: FilterableSelectDialogConfig<PotionSource> = useMemo(
    () => ({
      title: "Select Potion",
      searchPlaceholder: "Search potions...",
      emptyMessage: "No potions found.",
      categories: [
        { id: "crown" as const, label: "Crown Potions", items: CROWN_POTIONS },
        { id: "dropped" as const, label: "Dropped Potions", items: DROPPED_POTIONS },
        { id: "crafted" as const, label: "Crafted Potions", items: CRAFTED_POTIONS },
      ],
      allItems: ALL_POTIONS,
      defaultItem: NO_POTION,
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
    }),
    []
  )

  const handleSelect = (itemId: PotionId) => {
    onSelect(itemId)
  }

  return (
    <FilterableSelectDialog<PotionSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedPotionId}
      onSelect={handleSelect}
      defaultItem={potions.data["no-potion"]}
      config={config}
    />
  )
}
