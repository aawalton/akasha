"use client"

import { getSubcategory } from "akasha/code/type/narrowing/modules/get-subcategory/get-subcategory.module.code.ts"
import { drink } from "akasha/temper/catalog/temper-item-type/pages/drink.temper-item-type.ts"
import { food } from "akasha/temper/catalog/temper-item-type/pages/food.temper-item-type.ts"
import { convertIconPathToUrl } from "akasha/temper/player/character/characters-equipment/modules/get-equipment-icon/get-equipment-icon.module.code.ts"
import {
  type FoodOrDrinkId,
  type FoodOrDrinkSource,
  foodOrDrink,
  foodOrDrinkAt,
} from "akasha/temper/player/character/source/modules/food-or-drink-source/food-or-drink-source.module.code.ts"
import { EquipmentIcon } from "akasha/temper/web/characters-equipment-ui/modules/equipment-icon/equipment-icon.module.code.tsx"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogConfig,
} from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import {
  phraseIn,
  useWebPhrases,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { foodDrinkSelectDialogEmpty } from "akasha/temper/web/phrase/pages/food-drink-select-dialog-empty.temper-web-phrase.ts"
import { foodDrinkSelectDialogSearch } from "akasha/temper/web/phrase/pages/food-drink-select-dialog-search.temper-web-phrase.ts"
import { foodDrinkSelectDialogTitle } from "akasha/temper/web/phrase/pages/food-drink-select-dialog-title.temper-web-phrase.ts"
import { useMemo } from "react"

interface FoodDrinkSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedFoodDrinkId: FoodOrDrinkId
  onSelect: (foodDrinkId: FoodOrDrinkId) => void
}

type FoodsAndDrinks = ReturnType<typeof foodOrDrink>

function byName(held: FoodsAndDrinks, kind: "food" | "drink"): FoodOrDrinkSource[] {
  return [...getSubcategory(held, kind).list].sort((a, b) => a.name.localeCompare(b.name))
}

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
  const held = foodOrDrink()
  return held.has(id) ? held.data[id] : undefined
}

export function FoodDrinkSelectDialog({
  open,
  onOpenChange,
  selectedFoodDrinkId,
  onSelect,
}: FoodDrinkSelectDialogProps) {
  const held = foodOrDrink()
  const phrases = useWebPhrases()
  const config: FilterableSelectDialogConfig<FoodOrDrinkSource> = useMemo(
    () => ({
      title: phraseIn(phrases, foodDrinkSelectDialogTitle.slug),
      searchPlaceholder: phraseIn(phrases, foodDrinkSelectDialogSearch.slug),
      emptyMessage: phraseIn(phrases, foodDrinkSelectDialogEmpty.slug),
      categories: [
        { id: "food", label: food.title, items: byName(held, "food") },
        { id: "drink", label: drink.title, items: byName(held, "drink") },
      ],
      allItems: [...held.list],
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
    [held, phrases]
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
      defaultItem={foodOrDrinkAt("no-food-or-drink")}
      config={config}
    />
  )
}
