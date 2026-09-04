import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CompanionWeaponRoleTemplate {
  id: string
  name: string
  weaponSkillLineId: string
  validMainHandWeaponTypes: readonly string[]
  validOffHandWeaponTypes: readonly string[]
}

const COMPANION_WEAPON_ROLE_DATA = {
  "no-weapon-role": {
    id: "no-weapon-role" as const,
    name: "No Weapon Role",
    weaponSkillLineId: "no-skill-line",
    validMainHandWeaponTypes: [] as const,
    validOffHandWeaponTypes: [] as const,
  },
  "dual-wield": {
    id: "dual-wield" as const,
    name: "Dual Wield",
    weaponSkillLineId: "weapon-dual-wield",
    validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"] as const,
    validOffHandWeaponTypes: ["sword", "axe", "mace", "dagger"] as const,
  },
  "two-handed": {
    id: "two-handed" as const,
    name: "Two Handed",
    weaponSkillLineId: "weapon-two-handed",
    validMainHandWeaponTypes: ["greatsword", "battleaxe", "maul"] as const,
    validOffHandWeaponTypes: [] as const,
  },
  "one-hand-and-shield": {
    id: "one-hand-and-shield" as const,
    name: "One Hand and Shield",
    weaponSkillLineId: "weapon-one-hand-shield",
    validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"] as const,
    validOffHandWeaponTypes: ["shield"] as const,
  },
  "bow": {
    id: "bow" as const,
    name: "Bow",
    weaponSkillLineId: "weapon-bow",
    validMainHandWeaponTypes: ["bow"] as const,
    validOffHandWeaponTypes: [] as const,
  },
  "restoration-staff": {
    id: "restoration-staff" as const,
    name: "Restoration Staff",
    weaponSkillLineId: "weapon-restoration-staff",
    validMainHandWeaponTypes: ["restoration-staff"] as const,
    validOffHandWeaponTypes: [] as const,
  },
  "inferno-staff": {
    id: "inferno-staff" as const,
    name: "Inferno Staff",
    weaponSkillLineId: "weapon-destruction-staff",
    validMainHandWeaponTypes: ["inferno-staff"] as const,
    validOffHandWeaponTypes: [] as const,
  },
  "ice-staff": {
    id: "ice-staff" as const,
    name: "Ice Staff",
    weaponSkillLineId: "weapon-destruction-staff",
    validMainHandWeaponTypes: ["ice-staff"] as const,
    validOffHandWeaponTypes: [] as const,
  },
  "lightning-staff": {
    id: "lightning-staff" as const,
    name: "Lightning Staff",
    weaponSkillLineId: "weapon-destruction-staff",
    validMainHandWeaponTypes: ["lightning-staff"] as const,
    validOffHandWeaponTypes: [] as const,
  },
} as const satisfies Record<string, CompanionWeaponRoleTemplate>

export const companionWeaponRoles = createDataFile<CompanionWeaponRoleTemplate>()(
  COMPANION_WEAPON_ROLE_DATA
)

export type CompanionWeaponRoleId = (typeof companionWeaponRoles.ids)[number]
