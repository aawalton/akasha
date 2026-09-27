import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import {
  numberAt,
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import { isPriceEntry } from "akasha/temper/economy/trading/pricing/modules/is-price-entry/is-price-entry.module.code.ts"
import type {
  PricingData,
  TTCPriceEntry,
} from "akasha/temper/economy/trading/pricing/modules/pricing-types/pricing-types.module.code.ts"

export const COMPANION_GEAR_TTC_TYPES = {
  armorPiece: "temper-companion-armor-piece",
  jewelrySlot: "temper-companion-jewelry-slot",
  weaponType: "temper-companion-weapon-type",
  armorWeight: "temper-companion-armor-weight",
  trait: "temper-companion-trait",
  quality: "temper-companion-equipment-quality",
} as const

export type CompanionGearTtcType = keyof typeof COMPANION_GEAR_TTC_TYPES

export interface CompanionGearTtc {
  readonly armorItems: ReadonlyMap<string, number>
  readonly armorNames: ReadonlyMap<string, string>
  readonly jewelryItems: ReadonlyMap<string, number>
  readonly jewelryNames: ReadonlyMap<string, string>
  readonly weaponItems: ReadonlyMap<string, number>
  readonly categories: ReadonlyMap<string, number>
  readonly traits: ReadonlyMap<string, number>
  readonly qualities: ReadonlyMap<string, number>
}

function armorKey(slotId: string, weight: string): string {
  return `${slotId}:${weight}`
}

function numbersBy(rows: readonly Value[], field: string): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const row of rows) {
    const key = textAt(row, "key")
    const value = numberAt(row, field)
    if (key !== null && value !== null) found.set(key, value)
  }
  return found
}

export function companionGearTtcFrom(
  rowsOf: (kind: CompanionGearTtcType) => readonly Value[]
): CompanionGearTtc {
  const armorItems = new Map<string, number>()
  const armorNames = new Map<string, string>()
  for (const row of rowsOf("armorPiece")) {
    const slot = slugAt(row, "companionArmorSlot")
    const weight = slugAt(row, "companionArmorWeight")
    const itemId = numberAt(row, "ttcItemId")
    if (slot === null || weight === null || itemId === null) continue
    armorItems.set(armorKey(slot, weight), itemId)
    const title = textAt(row, "title")
    if (title !== null) armorNames.set(armorKey(slot, weight), title)
  }
  const jewelryNames = new Map<string, string>()
  for (const row of rowsOf("jewelrySlot")) {
    const key = textAt(row, "key")
    const name = textAt(row, "pieceName")
    if (key !== null && name !== null) jewelryNames.set(key, name)
  }
  return {
    armorItems,
    armorNames,
    jewelryItems: numbersBy(rowsOf("jewelrySlot"), "ttcItemId"),
    jewelryNames,
    weaponItems: numbersBy(rowsOf("weaponType"), "ttcItemId"),
    categories: numbersBy(rowsOf("armorWeight"), "ttcCategoryId"),
    traits: numbersBy(rowsOf("trait"), "ttcTraitId"),
    qualities: numbersBy(rowsOf("quality"), "ttcQualityId"),
  }
}

const UNREAD =
  "the Tamriel Trade Centre numbers for companion gear are read from pages, and nothing has read them yet — gate the screen on `CompanionGearTtcGate`"

class CompanionGearTtcUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "CompanionGearTtcUnread"
  }
}

let held: CompanionGearTtc | null = null

export function holdCompanionGearTtc(ttc: CompanionGearTtc): CompanionGearTtc {
  held = ttc
  return ttc
}

export function heldCompanionGearTtc(): CompanionGearTtc | null {
  return held
}

function companionGearTtc(): CompanionGearTtc {
  if (held === null) throw new CompanionGearTtcUnread()
  return held
}

function textOf(value: number | undefined): string | undefined {
  return value === undefined ? undefined : String(value)
}

export function ttcTraitIdOf(trait: Slug): string | undefined {
  return textOf(companionGearTtc().traits.get(trait))
}

export function ttcQualityIdOf(quality: Slug): number | undefined {
  return companionGearTtc().qualities.get(quality)
}

export function ttcCategoryOf(weight: string): string | undefined {
  return textOf(companionGearTtc().categories.get(weight.toLowerCase()))
}

export function companionPieceNameOf(
  category: "armor" | "jewelry" | "weapon",
  slotId: string,
  weight: string | undefined
): string | undefined {
  const ttc = companionGearTtc()
  if (category === "jewelry") return ttc.jewelryNames.get(slotId)
  if (category === "armor" && weight != null)
    return ttc.armorNames.get(armorKey(slotId, weight.toLowerCase()))
  return undefined
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
  const ttc = companionGearTtc()
  switch (slot.category) {
    case "armor":
      return (
        textOf(
          slot.weight != null ? ttc.armorItems.get(armorKey(slot.slotId, slot.weight)) : undefined
        ) ?? null
      )
    case "jewelry":
      return textOf(ttc.jewelryItems.get(slot.slotId)) ?? null
    case "weapon":
      return (
        textOf(slot.weaponTypeId != null ? ttc.weaponItems.get(slot.weaponTypeId) : undefined) ??
        null
      )
    default:
      return assertNever(slot.category)
  }
}

export function lookupCompanionGearPriceForSlot(
  pricing: PricingData,
  slot: CompanionGearSlotDescriptor,
  trait: Slug,
  quality: Slug
): CompanionGearPriceResult | null {
  const ttcTraitId = ttcTraitIdOf(trait)
  const ttcQualityId = textOf(ttcQualityIdOf(quality))
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
    const category2 = ttcCategoryOf(slot.weight)
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
  trait: Slug,
  quality: Slug
): CompanionGearPriceResult | null {
  const ttcTraitId = ttcTraitIdOf(trait)
  const ttcQualityId = textOf(ttcQualityIdOf(quality))

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
