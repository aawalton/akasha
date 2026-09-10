import { z } from "zod"
import type { InventoryItemData } from "../inventory-types/inventory-types.module.code.ts"

const FILTERTYPE_COMPANION = 27

const FILTERTYPE_ARMOR = 2

interface InferredSlot {
  equipType?: number
  weaponType?: number
  armorType?: number
}

const COMPANION_SLOT_MATCH_SCHEMA = z.union([z.tuple([z.string(), z.string()]), z.null()])

const COMPANION_SLOT_MAP: Record<string, InferredSlot> = {
  Necklace: { equipType: 2 },
  Ring: { equipType: 12 },
  Hat: { equipType: 1, armorType: 1 },
  Robe: { equipType: 3, armorType: 1 },
  Jerkin: { equipType: 3, armorType: 1 },
  Epaulets: { equipType: 4, armorType: 1 },
  Gloves: { equipType: 13, armorType: 1 },
  Sash: { equipType: 8, armorType: 1 },
  Breeches: { equipType: 9, armorType: 1 },
  Shoes: { equipType: 10, armorType: 1 },
  Helmet: { equipType: 1, armorType: 2 },
  Jack: { equipType: 3, armorType: 2 },
  "Arm Cops": { equipType: 4, armorType: 2 },
  Bracers: { equipType: 13, armorType: 2 },
  Belt: { equipType: 8, armorType: 2 },
  Guards: { equipType: 9, armorType: 2 },
  Boots: { equipType: 10, armorType: 2 },
  Helm: { equipType: 1, armorType: 3 },
  Cuirass: { equipType: 3, armorType: 3 },
  Pauldrons: { equipType: 4, armorType: 3 },
  Gauntlets: { equipType: 13, armorType: 3 },
  Girdle: { equipType: 8, armorType: 3 },
  Greaves: { equipType: 9, armorType: 3 },
  Sabatons: { equipType: 10, armorType: 3 },
  Sword: { equipType: 5, weaponType: 3 },
  Axe: { equipType: 5, weaponType: 1 },
  Mace: { equipType: 5, weaponType: 2 },
  Dagger: { equipType: 5, weaponType: 11 },
  Greatsword: { equipType: 6, weaponType: 4 },
  "Battle Axe": { equipType: 6, weaponType: 5 },
  Maul: { equipType: 6, weaponType: 6 },
  Bow: { equipType: 6, weaponType: 8 },
  "Restoration Staff": { equipType: 6, weaponType: 9 },
  "Inferno Staff": { equipType: 6, weaponType: 12 },
  "Ice Staff": { equipType: 6, weaponType: 13 },
  "Lightning Staff": { equipType: 6, weaponType: 15 },
  Shield: { equipType: 7, weaponType: 14 },
}

export function inferCompanionProperties(parsed: InventoryItemData): undefined {
  if (parsed.filterType !== FILTERTYPE_COMPANION) return

  const match = COMPANION_SLOT_MATCH_SCHEMA.parse(
    parsed.itemName.match(/^Companion's (.+?)(?:\s*\(|$)/)
  )
  if (!match) return
  const slot = match[1].trim()

  const inferred = COMPANION_SLOT_MAP[slot]
  if (!inferred) return

  if (inferred.equipType !== undefined && parsed.equipType === undefined)
    parsed.equipType = inferred.equipType
  if (inferred.weaponType !== undefined && parsed.weaponType === undefined)
    parsed.weaponType = inferred.weaponType
  if (inferred.armorType !== undefined && parsed.armorType === undefined)
    parsed.armorType = inferred.armorType
}

export function inferPlayerArmorProperties(parsed: InventoryItemData): undefined {
  if (parsed.filterType !== FILTERTYPE_ARMOR) return
  if (parsed.armorType !== undefined && parsed.equipType !== undefined) return

  const name = parsed.itemName

  if (name.endsWith("Arm Cops")) {
    const inferred = COMPANION_SLOT_MAP["Arm Cops"]
    if (inferred !== undefined) {
      if (inferred.armorType !== undefined && parsed.armorType === undefined)
        parsed.armorType = inferred.armorType
      if (inferred.equipType !== undefined && parsed.equipType === undefined)
        parsed.equipType = inferred.equipType
    }
    return
  }

  const lastSpace = name.lastIndexOf(" ")
  if (lastSpace < 0) return
  const suffix = name.slice(lastSpace + 1)

  const inferred = COMPANION_SLOT_MAP[suffix]
  if (!inferred || inferred.armorType === undefined) return

  if (parsed.armorType === undefined) parsed.armorType = inferred.armorType
  if (inferred.equipType !== undefined && parsed.equipType === undefined)
    parsed.equipType = inferred.equipType
}
