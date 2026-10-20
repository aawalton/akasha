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

interface WeaponPowerRule {
  readonly levelOnePower: number
  readonly topPower: number
  readonly twoHandedMeleePower: number
}

let powerRule: WeaponPowerRule | null = null

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

export function holdWeaponTypes(pages: Iterable<Row>, rules: Iterable<Row>): undefined {
  held.hold(gearTableOf(inGearOrder(pages, "hashPlace").map(typeOf)))
  for (const rule of rules) {
    powerRule = {
      levelOnePower: Number(rule.levelOnePower),
      topPower: Number(rule.topPower),
      twoHandedMeleePower: Number(rule.twoHandedMeleePower),
    }
  }
}

function heldPowerRule(): WeaponPowerRule {
  if (powerRule === null) {
    throw new Error(
      "the weapon power rule is read with the skill catalogue, and nothing has read it yet"
    )
  }
  return powerRule
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
  const { levelOnePower, topPower, twoHandedMeleePower } = heldPowerRule()
  const growth = ((topPower - levelOnePower) * worth) / topWorthLevel()
  const hands = weaponTypes.data[weaponType].isTwoHandedMelee ? twoHandedMeleePower : 1
  return Math.floor((levelOnePower + growth) * hands * qualityScale(curve, "weaponLevelScale"))
}
