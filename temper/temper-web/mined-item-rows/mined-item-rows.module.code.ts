import type {
  MinedItemData,
  MinedItemSearchResult,
  SetBonusEntry,
} from "@akasha/temper-items-core/item-tooltip-types"
import { z } from "zod"

export const MINED_ITEM_PAGE_TYPE = "temper-mined-item"

export const MINED_QUEST_PAGE_TYPE = "temper-mined-quest"

export const MINE_NAME = "eso"

export type MinedItemRow = Readonly<Record<string, unknown>>

const SET_BONUS = z.object({
  numRequired: z.number().catch(0),
  description: z.string(),
  isPerfected: z.boolean().catch(false),
})

function textOf(row: MinedItemRow, key: string): string {
  const one = row[key]
  return typeof one === "string" ? one : ""
}

function numberOf(row: MinedItemRow, key: string): number {
  const one = Number(textOf(row, key))
  return Number.isFinite(one) ? one : 0
}

function flagOf(row: MinedItemRow, key: string): boolean {
  return textOf(row, key) === "true"
}

function bonusOf(one: unknown): readonly SetBonusEntry[] {
  if (typeof one !== "string") return []
  try {
    const read = SET_BONUS.safeParse(JSON.parse(one))
    return read.success ? [read.data] : []
  } catch {
    return []
  }
}

export function setBonusesOf(row: MinedItemRow): readonly SetBonusEntry[] | null {
  const held = row.setBonuses
  if (!Array.isArray(held)) return null
  const read = held.flatMap(bonusOf)
  return read.length === 0 ? null : read
}

function minedAtToIso(raw: unknown): string {
  const date = new Date(Number(raw))
  return Number.isNaN(date.getTime()) ? "" : date.toISOString()
}

export function rowToMinedItemData(row: MinedItemRow): MinedItemData {
  return {
    itemId: numberOf(row, "itemId"),
    name: textOf(row, "name"),
    icon: textOf(row, "icon"),
    itemType: numberOf(row, "itemType"),
    specializedItemType: numberOf(row, "specializedItemType"),
    equipType: numberOf(row, "equipType"),
    weaponType: numberOf(row, "weaponType"),
    armorType: numberOf(row, "armorType"),
    weaponPower: numberOf(row, "weaponPower"),
    armorRating: numberOf(row, "armorRating"),
    requiredLevel: numberOf(row, "requiredLevel"),
    requiredCp: numberOf(row, "requiredCp"),
    value: numberOf(row, "value"),
    quality: numberOf(row, "quality"),
    style: numberOf(row, "style"),
    filterType: numberOf(row, "filterType"),
    filterTypeSpecific: numberOf(row, "filterTypeSpecific"),
    isUnique: flagOf(row, "isUnique"),
    isUniqueEquipped: flagOf(row, "isUniqueEquipped"),
    enchantHeader: textOf(row, "enchantHeader"),
    enchantDescription: textOf(row, "enchantDescription"),
    hasOnUseAbility: flagOf(row, "hasOnUseAbility"),
    abilityHeader: textOf(row, "abilityHeader"),
    abilityDescription: textOf(row, "abilityDescription"),
    abilityCooldown: numberOf(row, "abilityCooldown"),
    traitType: numberOf(row, "traitType"),
    traitDescription: textOf(row, "traitDescription"),
    hasSet: flagOf(row, "hasSet"),
    setId: numberOf(row, "setId"),
    setName: textOf(row, "setName"),
    setMaxEquip: numberOf(row, "setMaxEquip"),
    setBonuses: setBonusesOf(row),
    flavorText: textOf(row, "flavorText"),
    minedAt: minedAtToIso(row.minedAt),
  }
}

export function rowToSearchResult(row: MinedItemRow): MinedItemSearchResult {
  return {
    itemId: numberOf(row, "itemId"),
    name: textOf(row, "name"),
    icon: textOf(row, "icon"),
    quality: numberOf(row, "quality"),
    itemType: numberOf(row, "itemType"),
    filterType: numberOf(row, "filterType"),
    setName: typeof row.setName === "string" ? row.setName : null,
  }
}

export function minedItemRowOf(
  item: Readonly<Record<string, unknown>> & { readonly itemId: number; readonly name: string }
): Record<string, unknown> {
  const { name, itemId, ...rest } = item
  return { ...rest, slug: String(itemId), itemId, title: name, name }
}
