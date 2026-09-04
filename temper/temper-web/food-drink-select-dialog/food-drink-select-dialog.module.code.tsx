"use client"

import {
  type FoodOrDrinkId,
  type FoodOrDrinkSource,
  foodOrDrink,
} from "@akasha/temper-character-sources/food-or-drink-source"
import { convertIconPathToUrl } from "@akasha/temper-characters-equipment/get-equipment-icon"
import { EquipmentIcon } from "@akasha/temper-characters-equipment-ui/equipment-icon"
import { getSubcategory } from "@akasha/utils-narrow/get-subcategory"
import { useMemo } from "react"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogConfig,
} from "../filterable-select-dialog/filterable-select-dialog.module.code.tsx"

interface FoodDrinkSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedFoodDrinkId: FoodOrDrinkId
  onSelect: (foodDrinkId: FoodOrDrinkId) => void
}

const FOODS = [...getSubcategory(foodOrDrink, "food").list].sort((a, b) =>
  a.name.localeCompare(b.name)
)

const DRINKS = [...getSubcategory(foodOrDrink, "drink").list].sort((a, b) =>
  a.name.localeCompare(b.name)
)

function sortEffects(effects: readonly string[]): readonly string[] {
  return effects.toSorted((a, b) => {
    const aIsMax = a.startsWith("Max")
    const bIsMax = b.startsWith("Max")
    const aIsRecovery = a.includes("Recovery")
    const bIsRecovery = b.includes("Recovery")

    if (aIsMax && !bIsMax) return -1
    if (!aIsMax && bIsMax) return 1

    if (aIsRecovery && !bIsRecovery && !bIsMax) return -1
    if (!aIsRecovery && bIsRecovery && !aIsMax) return 1

    return a.localeCompare(b)
  })
}

export function getFoodDrinkById(id: FoodOrDrinkId): FoodOrDrinkSource | undefined {
  return foodOrDrink.has(id) ? foodOrDrink.data[id] : undefined
}

export function FoodDrinkSelectDialog({
  open,
  onOpenChange,
  selectedFoodDrinkId,
  onSelect,
}: FoodDrinkSelectDialogProps) {
  const config: FilterableSelectDialogConfig<FoodOrDrinkSource> = useMemo(
    () => ({
      title: "Select Food / Drink",
      searchPlaceholder: "Search food and drinks...",
      emptyMessage: "No food or drinks found.",
      categories: [
        { id: "food", label: "Food", items: FOODS },
        { id: "drink", label: "Drink", items: DRINKS },
      ],
      allItems: [
        foodOrDrink.data["no-food-or-drink"],
        ...getSubcategory(foodOrDrink, "food").list,
        ...getSubcategory(foodOrDrink, "drink").list,
      ],
      sortEffects,
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

  const handleSelect = (itemId: FoodOrDrinkId) => {
    onSelect(itemId)
  }

  return (
    <FilterableSelectDialog<FoodOrDrinkSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedFoodDrinkId}
      onSelect={handleSelect}
      defaultItem={foodOrDrink.data["no-food-or-drink"]}
      config={config}
    />
  )
}
