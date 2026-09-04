import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const arterialBurst = {
  id: "019e6251-4c86-7017-a0f0-8c3eb1159bbc",
  pageTypeSlug: "temper-skill",
  slug: "arterial-burst",
  title: "Arterial Burst",
  key: "arterial-burst",
  baseName: "Eviscerate",
  description:
    '"Rend an enemy, dealing 2399 Magic Damage and applying the Hemorrhaging status effect.\\n\\nDeals up to 33% more damage based on your missing Health.\\n\\nIf you use this ability while you are under 50% Health, it will always be a Critical Strike."',
  icon: "/esoui/art/icons/ability_u26_vampire_01_b.dds",
  esoSkillId: 41881,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
