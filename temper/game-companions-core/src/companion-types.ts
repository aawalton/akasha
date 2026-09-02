import type { TargetArmorId } from "@temper/game-characters-character/target-armor-data"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import type { CompanionBaseRoleId } from "./companion-base-roles-data"
import type { CompanionId } from "./companions-data"
import type { CompanionArmorSlotId } from "./equipment/companion-armor-slots-data"
import type { CompanionEquipmentQualityId } from "./equipment/companion-equipment-quality-data"
import type { CompanionJewelrySlotId } from "./equipment/companion-jewelry-slots-data"
import type { CompanionTraitId } from "./equipment/companion-traits-data"
import type { CompanionWeaponSlotId } from "./equipment/companion-weapon-slots-data"
import type { CompanionWeaponTypeId } from "./equipment/companion-weapon-types-data"
import type { CompanionSkillSlotId } from "./skills/companion-skill-slots-data"
import type { CompanionSkillId } from "./skills/companion-skills-data"

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
