import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarCrescentScythe = {
  id: "019e6484-38b0-75eb-a72e-958b5897f7f0",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-crescent-scythe",
  key: "zerith-var-crescent-scythe",
  title: "Crescent Scythe",
  icon: "/esoui/art/icons/ability_companion_necromancer_scythe.dds",
  description:
    "Your Companion summons an implement of moonlight that slashes the enemy's life force, dealing $1 Magic Damage. They heal for $2 Health every 2 seconds for $$2 seconds. The healing of this ability scales off their Max Health.",
  companionId: "zerith-var",
  abilityId: 213164,
  skillLineId: "companion-zerith-var-guardians-commitment",
  skillType: "active",
  validRoles: ["dps", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
