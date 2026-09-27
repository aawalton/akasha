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
import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import {
  type LevelScaling,
  levelScaledWorth,
  levelScalingOf,
} from "akasha/temper/player/character/characters-equipment/modules/level-scaling/level-scaling.module.code.ts"

interface WeaponTypeTemplate {
  readonly id: WeaponTypeId
  readonly name: string
  readonly esoWeaponType: string
  readonly validSlots: readonly string[]
  readonly weaponPower: number
  readonly isTwoHanded: boolean
  readonly enchantmentMultiplier: number
  readonly skillLineId: string
  readonly levelScaling: LevelScaling | undefined
}

type Row = Readonly<Record<string, unknown>>

const TYPE_PAGES = "temper-weapon-type/"

const ONE_HAND_LINES = "weapon-one-hand"

const NO_TYPE = "no-type"

function lineOf(row: Row): string {
  if (typeof row.skillLineId === "string") return slugOf(row.skillLineId)
  return row.slug === NO_TYPE ? "" : ONE_HAND_LINES
}

const held = heldGearTable<WeaponTypeId, WeaponTypeTemplate>("weapon types")

export const weaponTypes: DataFile<WeaponTypeId, WeaponTypeTemplate> = held.table

let powers: ReadonlyMap<string, number> | null = null

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
    levelScaling: levelScalingOf(row.levelSlope, row.levelIntercept),
  }
}

export function holdWeaponTypes(pages: Iterable<Row>, grades: Iterable<Row>): undefined {
  held.hold(gearTableOf(inGearOrder(pages, "hashPlace").map(typeOf)))
  const found = new Map<string, number>()
  for (const grade of grades) {
    const thing = String(grade.thing)
    if (!thing.startsWith(TYPE_PAGES)) continue
    found.set(`${slugOf(thing)}/${slugOf(grade.quality)}`, Number(grade.value))
  }
  powers = found
}

function powerOf(weaponType: WeaponTypeId, quality: EquipmentQualityId): number {
  if (powers === null) {
    throw new Error(
      "the weapon types are read with the skill catalogue, and nothing has read them yet"
    )
  }
  return powers.get(`${weaponType}/${quality}`) ?? 0
}

export function getWeaponPower(
  weaponType: WeaponTypeId,
  quality: EquipmentQualityId = "legendary",
  level?: ItemLevel
): number {
  if (weaponType === "no-type") {
    return 0
  }

  const scaling = weaponTypes.data[weaponType].levelScaling
  if (level !== undefined && scaling !== undefined) {
    const share = qualityScale(quality, "weaponLevelScale")
    return Math.floor(levelScaledWorth(level, scaling, share))
  }

  return powerOf(weaponType, quality)
}
