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
  readonly weaponPower: number
  readonly isTwoHanded: boolean
  readonly enchantmentMultiplier: number
  readonly skillLineId: string
  readonly levelIntercept: number
}

type Row = Readonly<Record<string, unknown>>

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
    weaponPower: Number(row.weaponPower),
    isTwoHanded: row.isTwoHanded === true,
    enchantmentMultiplier: Number(row.enchantmentMultiplier),
    skillLineId: lineOf(row),
    levelIntercept: Number(row.levelIntercept),
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

  const { weaponPower, levelIntercept } = weaponTypes.data[weaponType]
  const curve = quality === "legendary" ? "legendary" : "normal"
  const worth =
    pieceWorthLevel("legendary", level) +
    pieceWorthLevel(quality, level) -
    pieceWorthLevel(curve, level)
  const growth = ((weaponPower - levelIntercept) * worth) / topWorthLevel()
  return Math.floor((levelIntercept + growth) * qualityScale(curve, "weaponLevelScale"))
}
