import type { DataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import {
  type EquipmentQualityId,
  qualityScale,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import {
  gearTableOf,
  heldGearTable,
  inGearOrder,
  slugOf,
} from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"
import type { WeaponTypeId } from "akasha/temper/catalog/gear/equipment/modules/weapon-type-ids/weapon-type-ids.module.code.ts"
import { pieceWorthLevel } from "akasha/temper/player/character/characters-equipment/modules/armor-weights/armor-weights.module.code.ts"
import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import { topWorthLevel } from "akasha/temper/player/character/characters-equipment/modules/level-scaling/level-scaling.module.code.ts"

interface WeaponTypeTemplate {
  readonly id: WeaponTypeId
  readonly name: string
  readonly esoWeaponType: string
  readonly validSlots: readonly string[]
  readonly isTwoHanded: boolean
  readonly isTwoHandedMelee: boolean
  readonly enchantmentMultiplier: number
  readonly skillLineId: string
}

type Row = Readonly<Record<string, unknown>>

const LEVEL_ONE_POWER = 217

const TOP_POWER = 1335

const TWO_HANDED_MELEE_POWER = 1.177

const ONE_HAND_LINES = "weapon-one-hand"

const NO_TYPE = "no-type"

function lineOf(row: Row): string {
  if (typeof row.skillLineId === "string") return slugOf(row.skillLineId)
  return row.slug === NO_TYPE ? "" : ONE_HAND_LINES
}

const held = heldGearTable<WeaponTypeId, WeaponTypeTemplate>("weapon types")

export const weaponTypes: DataFile<WeaponTypeId, WeaponTypeTemplate> = held.table

function typeOf(row: Row): WeaponTypeTemplate {
  const slots: readonly unknown[] = Array.isArray(row.validSlots) ? row.validSlots : []
  return {
    id: String(row.slug) as WeaponTypeId,
    name: String(row.title),
    esoWeaponType: String(row.esoWeaponType),
    validSlots: slots.map(slugOf),
    isTwoHanded: row.isTwoHanded === true,
    isTwoHandedMelee: row.isTwoHandedMelee === true,
    enchantmentMultiplier: Number(row.enchantmentMultiplier),
    skillLineId: lineOf(row),
  }
}

export function holdWeaponTypes(pages: Iterable<Row>): undefined {
  held.hold(gearTableOf(inGearOrder(pages, "hashPlace").map(typeOf)))
}

export function getWeaponPower(
  weaponType: WeaponTypeId,
  quality: EquipmentQualityId = "legendary",
  level?: ItemLevel
): number {
  if (weaponType === "no-type") {
    return 0
  }

  const curve = quality === "legendary" ? "legendary" : "normal"
  const worth =
    pieceWorthLevel("legendary", level) +
    pieceWorthLevel(quality, level) -
    pieceWorthLevel(curve, level)
  const growth = ((TOP_POWER - LEVEL_ONE_POWER) * worth) / topWorthLevel()
  const hands = weaponTypes.data[weaponType].isTwoHandedMelee ? TWO_HANDED_MELEE_POWER : 1
  return Math.floor((LEVEL_ONE_POWER + growth) * hands * qualityScale(curve, "weaponLevelScale"))
}
