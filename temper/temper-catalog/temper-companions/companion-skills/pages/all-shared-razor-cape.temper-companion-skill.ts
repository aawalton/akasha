import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedRazorCape = {
  id: "019e668d-c554-7ab0-bb25-58496b8ab4e2",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-razor-cape",
  key: "shared-razor-cape",
  title: "Razor Cape",
  icon: "/esoui/art/icons/ability_companion_dualwield_004.dds",
  description:
    "Your Companion envelops themselves in a ring of floating razors, dealing $1 Physical Damage to nearby enemies every 2 seconds for $$1 seconds. The razors also shield them from attacks, reducing their damage taken by 20%.",
  companionId: "all",
  abilityId: 152696,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  validRoles: ["dps", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
