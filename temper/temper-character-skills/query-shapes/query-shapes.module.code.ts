import type { StandardArmorWeightId } from "@akasha/temper-equipment/armor-weight-ids"
import type { WeaponTypeId } from "@akasha/temper-equipment/weapon-type-ids"
import type { SkillBarId } from "@akasha/temper-skill-kinds/skill-bars"
import type { SkillSlotId } from "@akasha/temper-skill-kinds/skill-slots"
import type { SkillId } from "../character-skills/character-skills.module.code.ts"

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
