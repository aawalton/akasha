/**
 * Temper Companion Weapon Roles (Generated)
 *
 * Higher-level weapon role abstraction for the optimizer -- 8 real
 * roles (dual-wield, two-handed, one-hand-and-shield, bow,
 * restoration-staff, inferno-staff, ice-staff, lightning-staff) plus
 * the `no-weapon-role` sentinel that represents an unassigned weapon
 * role during phased optimization. Sourced from the universal pages
 * table (page type: temper-companion-weapon-role).
 *
 * Each entry's `id` is the stable codec-facing identifier and the
 * same string is used as the record key, so
 * `TEMPER_COMPANION_WEAPON_ROLES["dual-wield"]` is well-typed and
 * feeds the `companionWeaponRoles` lookup in @temper/game-companions-core.
 *
 * DO NOT EDIT -- regenerate with: ops temper addon-data generate
 */

import type { CompanionWeaponRoleTemplate } from "../equipment/companion-weapon-roles-data"

export const TEMPER_COMPANION_WEAPON_ROLES = {
  "no-weapon-role": { id: "no-weapon-role" as const, name: "No Weapon Role", weaponSkillLineId: "no-skill-line", validMainHandWeaponTypes: [] as const, validOffHandWeaponTypes: [] as const },
  "dual-wield": { id: "dual-wield" as const, name: "Dual Wield", weaponSkillLineId: "weapon-dual-wield", validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"] as const, validOffHandWeaponTypes: ["sword", "axe", "mace", "dagger"] as const },
  "two-handed": { id: "two-handed" as const, name: "Two Handed", weaponSkillLineId: "weapon-two-handed", validMainHandWeaponTypes: ["greatsword", "battleaxe", "maul"] as const, validOffHandWeaponTypes: [] as const },
  "one-hand-and-shield": { id: "one-hand-and-shield" as const, name: "One Hand and Shield", weaponSkillLineId: "weapon-one-hand-shield", validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"] as const, validOffHandWeaponTypes: ["shield"] as const },
  "bow": { id: "bow" as const, name: "Bow", weaponSkillLineId: "weapon-bow", validMainHandWeaponTypes: ["bow"] as const, validOffHandWeaponTypes: [] as const },
  "restoration-staff": { id: "restoration-staff" as const, name: "Restoration Staff", weaponSkillLineId: "weapon-restoration-staff", validMainHandWeaponTypes: ["restoration-staff"] as const, validOffHandWeaponTypes: [] as const },
  "inferno-staff": { id: "inferno-staff" as const, name: "Inferno Staff", weaponSkillLineId: "weapon-destruction-staff", validMainHandWeaponTypes: ["inferno-staff"] as const, validOffHandWeaponTypes: [] as const },
  "ice-staff": { id: "ice-staff" as const, name: "Ice Staff", weaponSkillLineId: "weapon-destruction-staff", validMainHandWeaponTypes: ["ice-staff"] as const, validOffHandWeaponTypes: [] as const },
  "lightning-staff": { id: "lightning-staff" as const, name: "Lightning Staff", weaponSkillLineId: "weapon-destruction-staff", validMainHandWeaponTypes: ["lightning-staff"] as const, validOffHandWeaponTypes: [] as const },
} as const satisfies Record<string, CompanionWeaponRoleTemplate>
