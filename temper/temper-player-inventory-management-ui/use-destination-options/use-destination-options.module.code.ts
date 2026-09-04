"use client"

import { useUserId } from "@akasha/pages-ui/use-user-id"
import { classifyLocation } from "@akasha/temper-items-core/location-classify"
import type {
  DestinationCategory,
  MoveToDestination,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { useMemo } from "react"
import { useInventory } from "../hooks-inventory/hooks-inventory.module.code.ts"
import { useManagedGuildBanks } from "../hooks-inventory-settings/hooks-inventory-settings.module.code.ts"

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

  return useMemo(() => {
    const groups: DestinationCategoryGroup[] = [
      { category: "bank", label: "Bank", items: [], defaultValue: "bank" },
      { category: "craft-bag", label: "Craft Bag", items: [], defaultValue: "craft-bag" },
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
            label: "Character",
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
      label: "Guild Bank",
      items: guildItems,
      defaultValue: "guild-bank",
    })

    const cofferItems: DestinationItem[] = [{ value: "furniture-vault", label: "Furniture Vault" }]
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
      label: "Housing Storage",
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
  }, [inventory, managedSet])
}
