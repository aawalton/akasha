import type { StandardArmorWeightId } from "akasha/temper/catalog/gear/equipment/modules/armor-weight-ids/armor-weight-ids.module.code.ts"
import type { WeaponTypeId } from "akasha/temper/catalog/gear/equipment/modules/weapon-type-ids/weapon-type-ids.module.code.ts"
import type { SkillBarId } from "akasha/temper/catalog/skill-kind/modules/skill-bars/skill-bars.module.code.ts"
import type { SkillSlotId } from "akasha/temper/catalog/skill-kind/modules/skill-slots/skill-slots.module.code.ts"
import type { SkillId } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"

interface ArmorItemShape {
  weight: StandardArmorWeightId
}

type ArmorSlotItemShape =
  | { itemType: "armor"; data: ArmorItemShape }
  | { itemType: "empty"; data: null }

export type ArmorShape = Record<string, ArmorSlotItemShape>

interface WeaponItemShape {
  type: WeaponTypeId
}

type WeaponSlotItemShape =
  | { itemType: "weapon"; data: WeaponItemShape }
  | { itemType: "shield"; data: unknown }
  | { itemType: "empty"; data: null }

export interface WeaponBarShape {
  "main-hand": WeaponSlotItemShape
  "off-hand": WeaponSlotItemShape
}

export type SkillBarsState = Record<SkillBarId, Record<SkillSlotId, SkillId>>
