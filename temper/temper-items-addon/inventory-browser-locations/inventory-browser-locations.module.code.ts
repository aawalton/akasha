import { ESO_BAG_WORN } from "@akasha/temper-items-core/eso-bag-constants"
import type { ItemLocationEntry } from "@akasha/temper-items-core/item-centric-inventory"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type {
  FixedLocationViewId,
  LocationViewKind,
  LocationViewOption,
} from "../inventory-browser-types/inventory-browser-types.module.code.ts"

function matchesFixed(
  entry: ItemLocationEntry,
  fixedId: FixedLocationViewId,
  currentCharId: string
): boolean {
  const t = entry.locationType
  switch (fixedId) {
    case "all":
      return true
    case "allBanks":
      return t === "bank" || t === "guild"
    case "allGuildBanks":
      return t === "guild"
    case "allCharacters":
      return t === "character" || t === "companion"
    case "allCompanions":
      return t === "companion"
    case "allEquipped":
      return (t === "character" && entry.bagId === ESO_BAG_WORN) || t === "companion"
    case "allStorage":
      return (
        t === "character" ||
        t === "bank" ||
        t === "craftbag" ||
        t === "companion" ||
        t === "housing-storage"
      )
    case "everything":
      return (
        t === "character" ||
        t === "bank" ||
        t === "craftbag" ||
        t === "companion" ||
        t === "housing-storage" ||
        t === "house"
      )
    case "bankOnly":
      return t === "bank"
    case "bankAndCharacters":
      return t === "bank" || t === "character" || t === "companion"
    case "bankCurrentCharacter":
      return t === "bank" || (t === "character" && entry.locationKey === currentCharId)
    case "bankOtherCharacters":
      return t === "bank" || (t === "character" && entry.locationKey !== currentCharId)
    case "craftBag":
      return t === "craftbag"
    case "housingStorage":
      return t === "housing-storage"
    case "allHouses":
      return t === "house" || t === "housing-storage"
    default:
      return assertNever(fixedId)
  }
}

function matchesDynamic(
  entry: ItemLocationEntry,
  kind: Exclude<LocationViewKind, "fixed">,
  locationKey: string | undefined
): boolean {
  if (locationKey === undefined || entry.locationKey !== locationKey) {
    return false
  }
  const t = entry.locationType
  switch (kind) {
    case "character":
      return t === "character"
    case "companion":
      return t === "companion"
    case "guildBank":
      return t === "guild"
    case "houseBank":
      return t === "housing-storage"
    default:
      return assertNever(kind)
  }
}

function matchesView(
  entry: ItemLocationEntry,
  option: LocationViewOption,
  currentCharId: string
): boolean {
  if (option.kind === "fixed") {
    if (option.fixedId === undefined) {
      return false
    }
    return matchesFixed(entry, option.fixedId, currentCharId)
  }
  return matchesDynamic(entry, option.kind, option.locationKey)
}

export function matchLocationView(
  locations: readonly ItemLocationEntry[],
  option: LocationViewOption,
  currentCharId: string
): boolean {
  for (const entry of locations) {
    if (matchesView(entry, option, currentCharId)) {
      return true
    }
  }
  return false
}

export function quantityInView(
  locations: readonly ItemLocationEntry[],
  option: LocationViewOption,
  currentCharId: string
): number {
  let total = 0
  for (const entry of locations) {
    if (matchesView(entry, option, currentCharId)) {
      total += entry.stackCount
    }
  }
  return total
}
