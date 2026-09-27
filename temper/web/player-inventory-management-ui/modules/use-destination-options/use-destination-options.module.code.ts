"use client"

import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import { titleOf } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { classifyLocation } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import type {
  DestinationCategory,
  MoveToDestination,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { useInventory } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory/hooks-inventory.module.code.ts"
import { useManagedGuildBanks } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { useMemo } from "react"

interface DestinationItem {
  value: MoveToDestination
  label: string
}

interface DestinationCategoryGroup {
  category: DestinationCategory
  label: string
  items: readonly DestinationItem[]
  defaultValue: MoveToDestination
}

export interface DestinationOptions {
  groups: readonly DestinationCategoryGroup[]
  getCategoryFor: (dest: MoveToDestination) => DestinationCategory
  getDefaultForCategory: (cat: DestinationCategory) => MoveToDestination
}

export function useDestinationOptions(): DestinationOptions {
  const userId = useUserId()
  const { inventory } = useInventory(userId)
  const { managedSet } = useManagedGuildBanks()
  const venues = useKeyedTitles(temperVenue.slug)
  const places = useKeyedTitles(temperLocationType.slug)

  return useMemo(() => {
    const venueTitle = (key: string): string => (venues === null ? key : titleOf(venues, key))
    const placeTitle = (key: string): string => (places === null ? key : titleOf(places, key))
    const groups: DestinationCategoryGroup[] = [
      { category: "bank", label: venueTitle("bank"), items: [], defaultValue: "bank" },
      {
        category: "craft-bag",
        label: placeTitle("craftbag"),
        items: [],
        defaultValue: "craft-bag",
      },
    ]

    const characters = inventory?.currencies?.characters
    if (characters) {
      const entries = Object.entries(characters)
      if (entries.length > 0) {
        const characterItems: DestinationItem[] = entries.map(([charId, charData]) => ({
          value: `character:${charId}`,
          label: charData.displayName !== "" ? charData.displayName : `Character ${charId}`,
        }))
        const firstCharacter = characterItems[0]
        if (firstCharacter !== undefined) {
          groups.push({
            category: "character",
            label: placeTitle("character"),
            items: characterItems,
            defaultValue: firstCharacter.value,
          })
        }
      }
    }

    const locations = inventory?.locations
    const guildItems: DestinationItem[] = []
    if (locations) {
      for (const [key, loc] of Object.entries(locations)) {
        if (classifyLocation(key) !== "guild") continue
        if (!managedSet.has(key)) continue
        guildItems.push({
          value: `guild-bank:${key}`,
          label: loc.displayName !== "" ? loc.displayName : key,
        })
      }
    }
    groups.push({
      category: "guild-bank",
      label: venueTitle("guild-bank"),
      items: guildItems,
      defaultValue: "guild-bank",
    })

    const cofferItems: DestinationItem[] = [
      { value: "furniture-vault", label: venueTitle("furniture-vault") },
    ]
    if (locations) {
      for (const [key, loc] of Object.entries(locations)) {
        if (!key.startsWith("HouseBank:")) continue
        const parts = key.split(":")
        if (parts.length < 3) continue
        const chestId = parts[2]
        if (chestId === undefined) continue
        cofferItems.push({
          value: `house-storage:${chestId}`,
          label: loc.displayName !== "" ? loc.displayName : `Storage Chest ${chestId}`,
        })
      }
    }
    groups.push({
      category: "housing-storage",
      label: placeTitle("housing-storage"),
      items: cofferItems,
      defaultValue: "house-storage",
    })

    function getCategoryFor(dest: MoveToDestination): DestinationCategory {
      if (dest === "bank") return "bank"
      if (dest === "craft-bag") return "craft-bag"
      if (dest.startsWith("character:")) return "character"
      if (dest.startsWith("character-worn:")) return "character"
      if (dest.startsWith("companion-worn:")) return "character"
      if (dest === "guild-bank" || dest.startsWith("guild-bank:")) return "guild-bank"
      return "housing-storage"
    }

    function getDefaultForCategory(cat: DestinationCategory): MoveToDestination {
      const group = groups.find((g) => g.category === cat)
      return group?.defaultValue ?? "bank"
    }

    return { groups, getCategoryFor, getDefaultForCategory }
  }, [inventory, managedSet, venues, places])
}
