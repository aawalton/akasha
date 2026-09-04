import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ambush = {
  id: "019e6245-a5e9-7fc0-a031-4b876c37eded",
  pageTypeSlug: "temper-skill",
  slug: "ambush",
  title: "Ambush",
  key: "ambush",
  baseName: "Teleport Strike",
  description:
    '"Flash through the shadows and ambush an enemy, dealing 1655 Physical Damage and afflicting them with Minor Vulnerability for 10 seconds, increasing their damage taken by 5%.\\n\\nAlso grants you Empower and Minor Berserk for 10 seconds, increasing the damage of your Heavy Attacks against monsters by 70% and your damage done by 5%."',
  icon: "/esoui/art/icons/ability_nightblade_008_b.dds",
  esoSkillId: 35898,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
