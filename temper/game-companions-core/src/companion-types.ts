import type { TargetArmorId } from "@akasha/temper-character-sources/target-armors"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import type { CompanionBaseRoleId } from "@akasha/temper-companions-core/companion-base-roles"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import type { CompanionArmorSlotId } from "@akasha/temper-companions-core/companion-armor-slots"
import type { CompanionEquipmentQualityId } from "@akasha/temper-companions-core/companion-equipment-qualities"
import type { CompanionJewelrySlotId } from "@akasha/temper-companions-core/companion-jewelry-slots"
import type { CompanionTraitId } from "@akasha/temper-companions-core/companion-traits"
import type { CompanionWeaponSlotId } from "@akasha/temper-companions-core/companion-weapon-slots"
import type { CompanionWeaponTypeId } from "@akasha/temper-companions-core/companion-weapon-types"
import type { CompanionSkillSlotId } from "@akasha/temper-companions-core/companion-skill-slots"
import type { CompanionSkillId } from "@akasha/temper-companions-core/companion-skills"

export type CompanionArmorWeight = "no-weight" | "light" | "medium" | "heavy"

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
