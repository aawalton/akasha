import { assertNever } from "@akasha/utils-narrow/assert-never"
import type {
  CompanionEquipmentQualityId,
  CompanionTraitId,
} from "../companion-gear-ids/companion-gear-ids.module.code.ts"
import { isPriceEntry } from "../is-price-entry/is-price-entry.module.code.ts"
import type { PricingData, TTCPriceEntry } from "../pricing-types/pricing-types.module.code.ts"

const ARMOR_TTC_ITEMS: Record<string, string> = {
  "head:light": "23761",
  "head:medium": "23533",
  "head:heavy": "23490",
  "shoulders:light": "23651",
  "shoulders:medium": "23757",
  "shoulders:heavy": "23614",
  "chest:light": "23407",
  "chest:medium": "23467",
  "chest:heavy": "23459",
  "hands:light": "23793",
  "hands:medium": "23719",
  "hands:heavy": "23732",
  "waist:light": "23537",
  "waist:medium": "23541",
  "waist:heavy": "23418",
  "legs:light": "23652",
  "legs:medium": "23540",
  "legs:heavy": "23594",
  "feet:light": "23520",
  "feet:medium": "23495",
  "feet:heavy": "23405",
}

const JEWELRY_TTC_ITEMS: Record<string, string> = {
  necklace: "23706",
  "ring-1": "23725",
  "ring-2": "23725",
}

const WEAPON_TTC_ITEMS: Record<string, string> = {
  sword: "23597",
  axe: "23609",
  mace: "23712",
  dagger: "23430",
  greatsword: "23654",
  battleaxe: "23792",
  maul: "23471",
  bow: "23789",
  "inferno-staff": "23640",
  "ice-staff": "23585",
  "lightning-staff": "23413",
  "restoration-staff": "23630",
  shield: "23435",
}

export const WEIGHT_TO_CATEGORY2: Record<string, string> = {
  light: "2",
  medium: "3",
  heavy: "4",
}

export const COMPANION_TRAIT_TO_TTC_TRAIT: Partial<Record<CompanionTraitId, string>> = {
  aggressive: "26",
  augmented: "27",
  bolstered: "28",
  focused: "29",
  prolific: "30",
  quickened: "31",
  shattering: "32",
  soothing: "33",
  vigorous: "34",
}

const QUALITY_TO_TTC_QUALITY: Partial<Record<CompanionEquipmentQualityId, string>> = {
  normal: "0",
  fine: "1",
  superior: "2",
  epic: "3",
  legendary: "4",
}

export interface CompanionGearPriceResult {
  estimatedCost: number
  entryCount: number
}

export interface CompanionGearSlotDescriptor {
  category: "armor" | "jewelry" | "weapon"
  slotId: string
  weight?: string
  weaponTypeId?: string
}

function collectCompanionEntries(
  data: PricingData["Data"],
  ttcQualityId: string,
  ttcTraitId: string
): readonly TTCPriceEntry[] {
  const entries: TTCPriceEntry[] = []
  const level = "1"

  for (const itemData of Object.values(data)) {
    const qualityData = itemData[ttcQualityId]
    if (!qualityData) continue

    const levelData = qualityData[level]
    if (!levelData) continue

    const traitData = levelData[ttcTraitId]
    if (!traitData) continue

    if (isPriceEntry(traitData)) {
      entries.push(traitData)
    } else {
      for (const sub of Object.values(traitData)) {
        if (isPriceEntry(sub)) {
          entries.push(sub)
        }
      }
    }
  }

  return entries
}

export function resolveTtcItemId(slot: CompanionGearSlotDescriptor): string | null {
  switch (slot.category) {
    case "armor":
      return (slot.weight != null ? ARMOR_TTC_ITEMS[`${slot.slotId}:${slot.weight}`] : null) ?? null
    case "jewelry":
      return JEWELRY_TTC_ITEMS[slot.slotId] ?? null
    case "weapon":
      return (slot.weaponTypeId != null ? WEAPON_TTC_ITEMS[slot.weaponTypeId] : null) ?? null
    default:
      return assertNever(slot.category)
  }
}

export function lookupCompanionGearPriceForSlot(
  pricing: PricingData,
  slot: CompanionGearSlotDescriptor,
  trait: CompanionTraitId,
  quality: CompanionEquipmentQualityId
): CompanionGearPriceResult | null {
  const ttcTraitId = COMPANION_TRAIT_TO_TTC_TRAIT[trait]
  const ttcQualityId = QUALITY_TO_TTC_QUALITY[quality]
  if (ttcTraitId == null || ttcQualityId == null) return null

  const itemId = resolveTtcItemId(slot)
  if (itemId == null) return null

  const itemData = pricing.Data[itemId]
  if (!itemData) return null

  const qualityData = itemData[ttcQualityId]
  if (!qualityData) return null

  const levelData = qualityData["1"]
  if (!levelData) return null

  const traitData = levelData[ttcTraitId]
  if (!traitData) return null

  let entry: TTCPriceEntry | undefined
  if (slot.category === "armor" && slot.weight != null) {
    const category2 = WEIGHT_TO_CATEGORY2[slot.weight]
    if (category2 == null) return null
    if (!isPriceEntry(traitData)) {
      entry = traitData[category2]
    }
  } else {
    if (isPriceEntry(traitData)) {
      entry = traitData
    }
  }

  if (!entry) return null
  const ec = entry.EC ?? 0
  if (ec <= 0) return null

  return {
    estimatedCost: Math.round(Math.max(entry.SA ?? 0, entry.N ?? 0)),
    entryCount: ec,
  }
}

export function lookupCompanionGearPrice(
  pricing: PricingData,
  trait: CompanionTraitId,
  quality: CompanionEquipmentQualityId
): CompanionGearPriceResult | null {
  const ttcTraitId = COMPANION_TRAIT_TO_TTC_TRAIT[trait]
  const ttcQualityId = QUALITY_TO_TTC_QUALITY[quality]

  if (ttcTraitId == null || ttcQualityId == null) return null

  const entries = collectCompanionEntries(pricing.Data, ttcQualityId, ttcTraitId)
  if (entries.length === 0) return null

  let totalCost = 0
  let totalEntryCount = 0

  for (const entry of entries) {
    const ec = entry.EC ?? 0
    if (ec <= 0) continue

    totalCost += Math.max(entry.SA ?? 0, entry.N ?? 0) * ec
    totalEntryCount += ec
  }

  if (totalEntryCount === 0) return null

  return {
    estimatedCost: Math.round(totalCost / totalEntryCount),
    entryCount: totalEntryCount,
  }
}
