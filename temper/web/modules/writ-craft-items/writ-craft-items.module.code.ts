"use client"

import type { BadgeToggleGroupItem } from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { alchemy } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/alchemy.temper-craft-type.ts"
import { blacksmithing } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/blacksmithing.temper-craft-type.ts"
import { clothing } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/clothing.temper-craft-type.ts"
import { enchanting } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/enchanting.temper-craft-type.ts"
import { jewelryCrafting } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/jewelry-crafting.temper-craft-type.ts"
import { provisioning } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/provisioning.temper-craft-type.ts"
import { woodworking } from "akasha/temper/catalog/pursuit/temper-craft-type/pages/woodworking.temper-craft-type.ts"
import { temperCraftType } from "akasha/temper/catalog/pursuit/temper-craft-type/temper-craft-type.page-type.ts"
import {
  type KeyedTitles,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { CharacterAutomationToggles } from "akasha/temper/player/character/build/build-support/modules/automation-settings/automation-settings.module.code.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { useMemo } from "react"

type WritCraftItem = BadgeToggleGroupItem & { value: keyof CharacterAutomationToggles }

interface CraftToggle {
  readonly value: keyof CharacterAutomationToggles
  readonly craft: string
}

const WRIT_CRAFTS: readonly CraftToggle[] = [
  { value: "dailyWritBlacksmithing", craft: blacksmithing.key },
  { value: "dailyWritClothier", craft: clothing.key },
  { value: "dailyWritWoodworking", craft: woodworking.key },
  { value: "dailyWritJewelrycrafting", craft: jewelryCrafting.key },
  { value: "dailyWritEnchanting", craft: enchanting.key },
  { value: "dailyWritAlchemy", craft: alchemy.key },
  { value: "dailyWritProvisioning", craft: provisioning.key },
]

const MASTER_WRIT_CRAFTS: readonly CraftToggle[] = [
  { value: "masterWritBlacksmithing", craft: blacksmithing.key },
  { value: "masterWritClothier", craft: clothing.key },
  { value: "masterWritWoodworking", craft: woodworking.key },
  { value: "masterWritJewelrycrafting", craft: jewelryCrafting.key },
  { value: "masterWritEnchanting", craft: enchanting.key },
  { value: "masterWritAlchemy", craft: alchemy.key },
  { value: "masterWritProvisioning", craft: provisioning.key },
]

function craftItems(toggles: readonly CraftToggle[], crafts: KeyedTitles | null): WritCraftItem[] {
  if (crafts === null) return []
  return toggles.map((toggle) => ({ value: toggle.value, label: titleOf(crafts, toggle.craft) }))
}

export function useWritCraftItems(): {
  writCraftItems: WritCraftItem[]
  masterWritCraftItems: WritCraftItem[]
} {
  const crafts = useKeyedTitles(temperCraftType.slug)
  return useMemo(
    () => ({
      writCraftItems: craftItems(WRIT_CRAFTS, crafts),
      masterWritCraftItems: craftItems(MASTER_WRIT_CRAFTS, crafts),
    }),
    [crafts]
  )
}
