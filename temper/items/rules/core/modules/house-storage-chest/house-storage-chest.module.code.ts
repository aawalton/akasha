import { isAllDigits } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"

export interface StorageChest {
  readonly chestId: string
  readonly name: string
}

export type ChestMatch =
  | { readonly kind: "one"; readonly chestId: string }
  | { readonly kind: "none" }
  | { readonly kind: "several"; readonly chestIds: readonly string[] }

const HOUSE_STORAGE_PREFIX = "house-storage:"

const HOUSE_BANK_KEY_PREFIX = "HouseBank:"

export function houseStorageTarget(destination: string): string | undefined {
  if (!destination.startsWith(HOUSE_STORAGE_PREFIX)) return undefined
  const target = destination.slice(HOUSE_STORAGE_PREFIX.length)
  return target.length > 0 ? target : undefined
}

function sameName(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase()
}

export function matchStorageChest(target: string, chests: readonly StorageChest[]): ChestMatch {
  const byId = isAllDigits(target)
  const found: string[] = []
  for (const chest of chests) {
    const hit = byId ? chest.chestId === target : sameName(chest.name, target)
    if (hit && !found.includes(chest.chestId)) found.push(chest.chestId)
  }
  const first = found[0]
  if (first === undefined) return { kind: "none" }
  if (found.length === 1) return { kind: "one", chestId: first }
  return { kind: "several", chestIds: found }
}

export function chestIdOfHouseBankKey(key: string): string | undefined {
  if (!key.startsWith(HOUSE_BANK_KEY_PREFIX)) return undefined
  const parts = key.split(":")
  const last = parts[parts.length - 1]
  return last !== undefined && last.length > 0 ? last : undefined
}

export function storageChestsOf(
  locations: Readonly<Record<string, { readonly displayName: string }>>
): StorageChest[] {
  const chests: StorageChest[] = []
  for (const [key, location] of Object.entries(locations)) {
    const chestId = chestIdOfHouseBankKey(key)
    if (chestId === undefined) continue
    chests.push({ chestId, name: location.displayName })
  }
  return chests
}

export function houseBankKeyFor(
  destination: string,
  locations: Readonly<Record<string, { readonly displayName: string }>>
): string | undefined {
  const target = houseStorageTarget(destination)
  if (target === undefined) return undefined
  const match = matchStorageChest(target, storageChestsOf(locations))
  if (match.kind !== "one") return undefined
  for (const key of Object.keys(locations)) {
    if (chestIdOfHouseBankKey(key) === match.chestId) return key
  }
  return undefined
}

export function chestMatchProblem(target: string, match: ChestMatch): string | undefined {
  if (match.kind === "none") return `no storage chest named ${target}`
  if (match.kind === "several") return `${match.chestIds.length} storage chests named ${target}`
  return undefined
}
