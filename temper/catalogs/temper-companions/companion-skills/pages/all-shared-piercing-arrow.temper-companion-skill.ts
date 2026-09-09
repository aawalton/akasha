import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedPiercingArrow = {
  id: "019e668d-c54e-717c-857e-6243e6cc27f5",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-piercing-arrow",
  key: "shared-piercing-arrow",
  title: "Piercing Arrow",
  icon: "/esoui/art/icons/ability_companion_bow_001.dds",
  description:
    "Your Companion plants a masterfully aimed arrow in an enemy's vital spot, dealing $1 Physical Damage.",
  companionId: "all",
  abilityId: 152793,
  skillLineId: "weapon-bow",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
