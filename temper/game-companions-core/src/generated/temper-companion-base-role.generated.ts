/**
 * Temper Companion Base Roles (Generated)
 *
 * The four companion base roles (dps, tank, healer, support) sourced
 * from the universal pages table (page type: temper-companion-base-role).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CompanionArmorWeight } from "../companion-types"
import type { CompanionTraitId } from "@akasha/temper-companions-core/companion-traits"
import type { CompanionWeaponRoleId } from "@akasha/temper-companions-core/companion-weapon-roles"

interface CompanionBaseRoleTemplate {
  id: string
  name: string
  abbreviation: string
  description: string
  validWeaponRoleIds: readonly CompanionWeaponRoleId[]
  validTraitIds: readonly CompanionTraitId[]
  validArmorWeights: readonly CompanionArmorWeight[]
}

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `companionBaseRoles.ids` so `(typeof companionBaseRoles.ids)[number]`
 * stays literal-union typed for callers in `companion-schema.ts` and
 * elsewhere.
 */
export const TEMPER_COMPANION_BASE_ROLES_BY_ID = {
  "dps": {
    id: "dps" as const,
    name: "DPS",
    abbreviation: "D",
    description: "Focused on dealing damage",
    validWeaponRoleIds: ["dual-wield", "two-handed", "bow", "inferno-staff", "ice-staff", "lightning-staff"] as readonly CompanionWeaponRoleId[],
    validTraitIds: ["aggressive", "shattering", "quickened", "focused"] as readonly CompanionTraitId[],
    validArmorWeights: ["medium"] as readonly CompanionArmorWeight[],
  },
  "tank": {
    id: "tank" as const,
    name: "Tank",
    abbreviation: "T",
    description: "Focused on absorbing damage and controlling enemies",
    validWeaponRoleIds: ["one-hand-and-shield", "ice-staff", "restoration-staff"] as readonly CompanionWeaponRoleId[],
    validTraitIds: ["vigorous", "soothing", "quickened", "focused"] as readonly CompanionTraitId[],
    validArmorWeights: ["heavy"] as readonly CompanionArmorWeight[],
  },
  "healer": {
    id: "healer" as const,
    name: "Healer",
    abbreviation: "H",
    description: "Focused on healing and supporting allies",
    validWeaponRoleIds: ["restoration-staff"] as readonly CompanionWeaponRoleId[],
    validTraitIds: ["soothing", "quickened", "focused"] as readonly CompanionTraitId[],
    validArmorWeights: ["light"] as readonly CompanionArmorWeight[],
  },
  "support": {
    id: "support" as const,
    name: "Support",
    abbreviation: "S",
    description: "Focused on buffing allies through offensive and defensive buffs and debuffs",
    validWeaponRoleIds: ["restoration-staff"] as readonly CompanionWeaponRoleId[],
    validTraitIds: ["quickened"] as readonly CompanionTraitId[],
    validArmorWeights: ["light"] as readonly CompanionArmorWeight[],
  },
} satisfies Record<string, CompanionBaseRoleTemplate>
