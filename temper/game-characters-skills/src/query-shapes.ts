import type { StandardArmorWeightId } from "@temper/game-characters-equipment/armor/armor-weights-data"
import type { WeaponTypeId } from "@temper/game-characters-equipment/weapons/weapon-types-data"
import type { SkillBarId } from "./skill-bars-data"
import type { SkillSlotId } from "./skill-slots-data"
import type { SkillId } from "./skills-data"

interface ArmorItemShape {
  weight: StandardArmorWeightId
}

export type ArmorSlotItemShape =
  | { itemType: "armor"; data: ArmorItemShape }
  | { itemType: "empty"; data: null }

export type ArmorShape = Record<string, ArmorSlotItemShape>

interface WeaponItemShape {
  type: WeaponTypeId
}

export type WeaponSlotItemShape =
  | { itemType: "weapon"; data: WeaponItemShape }
  | { itemType: "shield"; data: unknown }
  | { itemType: "empty"; data: null }

export interface WeaponBarShape {
  "main-hand": WeaponSlotItemShape
  "off-hand": WeaponSlotItemShape
}

export type SkillBarsState = Record<SkillBarId, Record<SkillSlotId, SkillId>>
