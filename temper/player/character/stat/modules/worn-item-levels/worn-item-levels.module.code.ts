import type { ArmorSlotId } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-slots/armor-slots.module.code.ts"
import type { JewelrySlotId } from "akasha/temper/catalog/gear/equipment/kind/modules/jewelry-slots/jewelry-slots.module.code.ts"
import {
  itemLevelOfPlace,
  itemLevelPlaceOfRequired,
} from "akasha/temper/player/character/build/build-codec/modules/item-level-places/item-level-places.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type { WeaponBars } from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"

export type WornPiece = {
  readonly slot: number
  readonly link: string
  readonly requiredLevel?: number | undefined
  readonly requiredChampionPoints?: number | undefined
}

export type LinkedItem = {
  readonly link: string
  readonly requiredLevel: number
  readonly requiredCp: number
}

export type ChampionLevels = ReadonlyMap<number, ItemLevel>

type Levels = {
  readonly level?: ItemLevel
  readonly enchantmentLevel?: number
  readonly unplaced?: true
}

const HIGHEST_CHARACTER_LEVEL = 50

const LINK_LEVELS = /^\|H\d:item:\d+:(\d+):(\d+):\d+:\d+:(\d+)/

export function championLevelsOf(items: Iterable<LinkedItem>): ChampionLevels {
  const seen = new Map<number, ItemLevel | null>()
  for (const item of items) {
    const fields = LINK_LEVELS.exec(item.link)
    if (fields === null || Number(fields[2]) !== HIGHEST_CHARACTER_LEVEL) continue
    const level = itemLevelOfPlace(itemLevelPlaceOfRequired(item.requiredLevel, item.requiredCp))
    if (level === undefined) continue
    const subtype = Number(fields[1])
    const before = seen.get(subtype)
    seen.set(subtype, before === undefined || before === level ? level : null)
  }
  const placed = new Map<number, ItemLevel>()
  for (const [subtype, level] of seen) if (level !== null) placed.set(subtype, level)
  return placed
}

const ARMOR: Readonly<Record<number, ArmorSlotId>> = {
  0: "head",
  2: "chest",
  3: "shoulders",
  6: "waist",
  8: "legs",
  9: "feet",
  16: "hands",
}

const JEWELRY: Readonly<Record<number, JewelrySlotId>> = {
  1: "necklace",
  11: "ring-1",
  12: "ring-2",
}

const WEAPONS: Readonly<Record<number, readonly [keyof WeaponBars, "main-hand" | "off-hand"]>> = {
  4: ["primary-weapon-bar", "main-hand"],
  5: ["primary-weapon-bar", "off-hand"],
  20: ["backup-weapon-bar", "main-hand"],
  21: ["backup-weapon-bar", "off-hand"],
}

function itemLevelOf(
  piece: WornPiece,
  subtype: number,
  linked: number,
  levels: ChampionLevels
): Levels {
  if (piece.requiredLevel !== undefined) {
    const place = itemLevelPlaceOfRequired(piece.requiredLevel, piece.requiredChampionPoints ?? 0)
    const level = itemLevelOfPlace(place)
    return level === undefined ? {} : { level }
  }
  if (linked === HIGHEST_CHARACTER_LEVEL) {
    const level = levels.get(subtype)
    return level === undefined ? { unplaced: true } : { level }
  }
  return linked > 0 && linked < HIGHEST_CHARACTER_LEVEL ? { level: linked } : {}
}

export function wornLevelsOf(piece: WornPiece, levels: ChampionLevels): Levels {
  const fields = LINK_LEVELS.exec(piece.link)
  const glyph = Number(fields?.[3] ?? 0)
  return {
    ...itemLevelOf(piece, Number(fields?.[1] ?? 0), Number(fields?.[2] ?? 0), levels),
    ...(glyph > 0 ? { enchantmentLevel: glyph } : {}),
  }
}

function filled<Data extends Levels>(data: Data, worn: Levels): Data {
  return {
    ...data,
    ...(data.level === undefined && worn.level !== undefined ? { level: worn.level } : {}),
    ...(data.enchantmentLevel === undefined && worn.enchantmentLevel !== undefined
      ? { enchantmentLevel: worn.enchantmentLevel }
      : {}),
  }
}

export function withWornLevels(
  build: CharacterState,
  worn: readonly WornPiece[],
  championLevels: ChampionLevels
): CharacterState {
  const armor = { ...build.equipment.armor }
  const jewelry = { ...build.equipment.jewelry }
  const bars: WeaponBars = {
    "primary-weapon-bar": { ...build.equipment["primary-weapon-bar"] },
    "backup-weapon-bar": { ...build.equipment["backup-weapon-bar"] },
  }
  for (const piece of worn) {
    const levels = wornLevelsOf(piece, championLevels)
    const armorSlot = ARMOR[piece.slot]
    const jewelrySlot = JEWELRY[piece.slot]
    const weaponSlot = WEAPONS[piece.slot]
    if (armorSlot !== undefined) {
      const held = armor[armorSlot]
      if (held.itemType === "armor") {
        armor[armorSlot] = { itemType: "armor", data: filled(held.data, levels) }
      }
    } else if (jewelrySlot !== undefined) {
      const held = jewelry[jewelrySlot]
      if (held.itemType === "jewelry") {
        jewelry[jewelrySlot] = { itemType: "jewelry", data: filled(held.data, levels) }
      }
    } else if (weaponSlot !== undefined) {
      const [bar, hand] = weaponSlot
      const held = bars[bar][hand]
      if (held.itemType === "weapon") {
        bars[bar][hand] = { itemType: "weapon", data: filled(held.data, levels) }
      } else if (held.itemType === "shield") {
        bars[bar][hand] = { itemType: "shield", data: filled(held.data, levels) }
      }
    }
  }
  return { ...build, equipment: { ...build.equipment, armor, jewelry, ...bars } }
}
