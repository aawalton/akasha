import type { TargetArmorId } from "@akasha/temper-character-sources/target-armors"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import type { CompanionArmorSlotId } from "../companion-armor-slots/companion-armor-slots.module.code.ts"
import type { CompanionArmorWeight } from "../companion-armor-weights/companion-armor-weights.module.code.ts"
import type { CompanionBaseRoleId } from "../companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionEquipmentQualityId } from "../companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import type { CompanionJewelrySlotId } from "../companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import type { CompanionSkillSlotId } from "../companion-skill-slots/companion-skill-slots.module.code.ts"
import type { CompanionSkillId } from "../companion-skills/companion-skills.module.code.ts"
import type { CompanionTraitId } from "../companion-traits/companion-traits.module.code.ts"
import type { CompanionWeaponSlotId } from "../companion-weapon-slots/companion-weapon-slots.module.code.ts"
import type { CompanionWeaponTypeId } from "../companion-weapon-types/companion-weapon-types.module.code.ts"
import type { CompanionId } from "../companions/companions.module.code.ts"

interface CompanionArmorItem {
  type: CompanionArmorSlotId
  weight: CompanionArmorWeight
  trait: CompanionTraitId
  quality: CompanionEquipmentQualityId
}

interface CompanionJewelryItem {
  type: CompanionJewelrySlotId
  trait: CompanionTraitId
  quality: CompanionEquipmentQualityId
}

interface CompanionWeaponItem {
  slot: CompanionWeaponSlotId
  type: CompanionWeaponTypeId
  trait: CompanionTraitId
  quality: CompanionEquipmentQualityId
}

export type CompanionArmorSlotItem =
  | { itemType: "armor"; data: CompanionArmorItem }
  | { itemType: "empty"; data: null }

export type CompanionJewelrySlotItem =
  | { itemType: "jewelry"; data: CompanionJewelryItem }
  | { itemType: "empty"; data: null }

export type CompanionWeaponSlotItem =
  | { itemType: "weapon"; data: CompanionWeaponItem }
  | { itemType: "empty"; data: null }

export type CompanionVisibility = "private" | "unlisted" | "public" | "live" | "target"

export function toVisibility(value: string | undefined): CompanionVisibility {
  if (value === "public" || value === "unlisted" || value === "live" || value === "target")
    return value
  return "private"
}

export type CompanionTargetArmorId = TargetArmorId

export type CompanionTargetHealthId = "full" | "execute"

type TestCompanionCategory = "class-skills" | "shared-skills"

interface CompanionRotationConfig {
  cycleDuration: number
  ultimateThreshold: number
}

export const DEFAULT_COMPANION_ROTATION_CONFIG: CompanionRotationConfig = {
  cycleDuration: 600,
  ultimateThreshold: 100,
}

export interface CompanionState {
  id: BuildId
  name: string
  description: string
  isTestBuild?: boolean
  testCategory?: TestCompanionCategory
  companion: {
    id: CompanionId
    baseRoles: readonly CompanionBaseRoleId[]
  }
  equipment: {
    armor: Record<CompanionArmorSlotId, CompanionArmorSlotItem>
    jewelry: Record<CompanionJewelrySlotId, CompanionJewelrySlotItem>
    weapons: Record<CompanionWeaponSlotId, CompanionWeaponSlotItem>
  }
  skills: {
    "skill-bar": Record<CompanionSkillSlotId, CompanionSkillId>
  }
  target: {
    armor: CompanionTargetArmorId
    targetCount: number
    targetHealth: CompanionTargetHealthId
  }
}
