import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"
import { FLAGS } from "akasha/temper/web/item-browser/modules/item-browser-constants/item-browser-constants.module.code.ts"
import type { ItemBrowserRow } from "akasha/temper/web/item-browser/modules/item-browser-types/item-browser-types.module.code.ts"

type RowSet = Pick<
  TemperSet,
  | "esoSetId"
  | "esoArmorTypes"
  | "esoEquipTypes"
  | "esoWeaponTypes"
  | "setTypeId"
  | "setTraitsNeeded"
  | "itemBrowserItemId"
  | "itemBrowserKinds"
  | "itemBrowserSources"
  | "itemBrowserStyle"
  | "itemBrowserSubname"
>

type Source = number | readonly number[]

const CRAFTED_SET_TYPE = 3

const MYTHIC_SET_TYPE = 12

const JEWELRY_SLOTS: readonly string[] = ["EQUIP_TYPE_NECK", "EQUIP_TYPE_RING"]

const WEAPON_SLOTS: readonly string[] = [
  "EQUIP_TYPE_ONE_HAND",
  "EQUIP_TYPE_TWO_HAND",
  "EQUIP_TYPE_OFF_HAND",
]

const MONSTER_SLOTS: readonly string[] = ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"]

const SHIELD = "WEAPONTYPE_SHIELD"

const KEPT_FLAGS: { readonly [kind: string]: number | undefined } = {
  "alliance-style": FLAGS.allianceStyle,
  "multi-style": FLAGS.multiStyle,
  "manual-style": FLAGS.manualStyle,
  jewelry: FLAGS.jewelry,
}

function allIn(this: void, held: readonly string[], within: readonly string[]): boolean {
  return held.length > 0 && held.every((one) => within.includes(one))
}

function monsterIn(this: void, slots: readonly string[]): boolean {
  return slots.length === MONSTER_SLOTS.length && MONSTER_SLOTS.every((one) => slots.includes(one))
}

function flagsOf(this: void, set: RowSet): number {
  const slots = set.esoEquipTypes ?? []
  const weapon = allIn(slots, WEAPON_SLOTS)
  let flags = 0
  if (set.setTypeId === CRAFTED_SET_TYPE) flags = BitOr(flags, FLAGS.crafted)
  if (allIn(slots, JEWELRY_SLOTS)) flags = BitOr(flags, FLAGS.jewelry)
  if (weapon) flags = BitOr(flags, FLAGS.weapon)
  if (monsterIn(slots)) flags = BitOr(flags, FLAGS.monster)
  if ((set.esoArmorTypes ?? []).length > 1) flags = BitOr(flags, FLAGS.mixedWeights)
  if (set.setTypeId === MYTHIC_SET_TYPE) flags = BitOr(flags, FLAGS.mythic)
  if (weapon && (set.esoWeaponTypes ?? []).includes(SHIELD)) flags = BitOr(flags, FLAGS.shield)
  for (const kind of set.itemBrowserKinds ?? []) flags = BitOr(flags, KEPT_FLAGS[kind] ?? 0)
  return flags
}

function wholeIn(this: void, said: string | undefined): number | undefined {
  if (said === undefined || said === "") return undefined
  const held = Number(said)
  return Math.floor(held) === held ? held : undefined
}

function sourcesOf(this: void, said: readonly string[]): Source[] | undefined {
  const found: Source[] = []
  for (const one of said) {
    const [place, narrower] = one.split(":")
    const zone = wholeIn(place)
    if (zone === undefined) return undefined
    found.push(zone)
    if (narrower === undefined) continue
    const zones: number[] = []
    for (const each of narrower.split(",")) {
      const narrowed = wholeIn(each)
      if (narrowed === undefined) return undefined
      zones.push(narrowed)
    }
    found.push(zones)
  }
  return found
}

function rowOf(this: void, set: RowSet): ItemBrowserRow | undefined {
  const id = set.itemBrowserItemId
  if (id === undefined) return undefined
  const sources = sourcesOf(set.itemBrowserSources ?? [])
  if (sources === undefined) return undefined
  const ext = set.setTypeId === CRAFTED_SET_TYPE ? set.setTraitsNeeded : set.itemBrowserStyle
  return { id, flags: flagsOf(set), sources, ext, alt: set.itemBrowserSubname }
}

function rowsOf(this: void): readonly ItemBrowserRow[] {
  const sets = [...$pagesOfType<RowSet>(temperSet)]
  sets.sort((one, other) => one.esoSetId - other.esoSetId)
  const rows: ItemBrowserRow[] = []
  for (const set of sets) {
    const row = rowOf(set)
    if (row !== undefined) rows.push(row)
  }
  return rows
}

export const ITEM_BROWSER_ROWS: readonly ItemBrowserRow[] = rowsOf()
