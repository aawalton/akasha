import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedVipersBite = {
  id: "019e668d-c550-7a2f-b045-155ddce14385",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-vipers-bite",
  key: "shared-vipers-bite",
  title: "Viper's Bite",
  icon: "/esoui/art/icons/ability_companion_bow_002.dds",
  description:
    "Your Companion shoots an arrow covered in Baandari poison at an enemy, dealing $1 Poison Damage and an additional $2 Poison Damage over $$2 seconds.",
  companionId: "all",
  abilityId: 152863,
  skillLineId: "weapon-bow",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
