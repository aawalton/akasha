import type { StandardArmorWeightId } from "akasha/temper/temper-equipment/armor-weight-ids/armor-weight-ids.module.code.ts"
import type { WeaponTypeId } from "akasha/temper/temper-equipment/weapon-type-ids/weapon-type-ids.module.code.ts"
import type { SkillBarId } from "../../skill-kinds/skill-bars/skill-bars.module.code.ts"
import type { SkillSlotId } from "../../skill-kinds/skill-slots/skill-slots.module.code.ts"
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
