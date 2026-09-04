import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedProvoke = {
  id: "019e668d-c558-72bb-83be-19b7b5db6635",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-provoke",
  key: "shared-provoke",
  title: "Provoke",
  icon: "/esoui/art/icons/ability_companion_1handed_002.dds",
  description:
    "Your Companion thrusts their weapon with disciplined precision at an enemy, dealing $1 Physical Damage and taunting the enemy to attack them for $$2 seconds.",
  companionId: "all",
  abilityId: 152625,
  skillLineId: "weapon-one-hand-shield",
  skillType: "active",
  validRoles: ["dps", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
