import type { KeyedTitles } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"

const LOCATION_TYPE_IDS = [
  "character",
  "bank",
  "craftbag",
  "housing-storage",
  "house",
  "companion",
  "guild",
] as const

export type LocationTypeId = (typeof LOCATION_TYPE_IDS)[number]

const LOCATION_TYPE_SET: ReadonlySet<string> = new Set(LOCATION_TYPE_IDS)

export function isLocationTypeId(value: string): value is LocationTypeId {
  return LOCATION_TYPE_SET.has(value)
}

function isAllDigits(s: string): boolean {
  if (s.length === 0) return false
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i)
    if (code < 48 || code > 57) return false
  }
  return true
}

type LocationNamed = (key: string) => string | undefined

const NAMED_BY_PLACE: Readonly<Record<string, string>> = { CraftBag: "craftbag" }

const NAMED_BY_VENUE: Readonly<Record<string, string>> = { FurnitureVault: "furniture-vault" }

export function locationNamesFrom(
  places: KeyedTitles | null,
  venues: KeyedTitles | null
): LocationNamed {
  return (key) => {
    const place = NAMED_BY_PLACE[key]
    if (place !== undefined) return places?.titles.get(place)
    const venue = NAMED_BY_VENUE[key]
    if (venue !== undefined) return venues?.titles.get(venue)
    return undefined
  }
}

export function getLocationDisplayName(
  key: string,
  storedDisplayName: string,
  named?: LocationNamed
): string {
  return named?.(key) ?? storedDisplayName
}

export function classifyLocation(key: string): LocationTypeId {
  if (key === "Bank") return "bank"
  if (key === "CraftBag") return "craftbag"
  if (key === "FurnitureVault") return "housing-storage"
  if (key.startsWith("HouseBank:")) return "housing-storage"
  if (key.startsWith("Storage Chest")) return "housing-storage"
  if (key.startsWith("Storage Coffer")) return "housing-storage"
  if (key.startsWith("House:")) return "house"
  if (key.startsWith("Companion:")) return "companion"
  if (isAllDigits(key)) return "character"
  return "guild"
}
