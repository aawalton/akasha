import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedSpinningSteel = {
  id: "019e668d-c555-75f2-b975-63bd57ee036f",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-spinning-steel",
  key: "shared-spinning-steel",
  title: "Spinning Steel",
  icon: "/esoui/art/icons/ability_companion_dualwield_005.dds",
  description:
    "Your Companion launches themselves in a lethal spin, dealing $1 Physical Damage to nearby enemies. Deals triple damage to enemies below 25% Health.",
  companionId: "all",
  abilityId: 152693,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  validRoles: ["dps"],
  tags: ["execute-3x-below-25pct"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
