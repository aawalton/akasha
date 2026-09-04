import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healthyOffering = {
  id: "019e6245-a6a1-7e8b-a8ae-8556282f4e6b",
  pageTypeSlug: "temper-skill",
  slug: "healthy-offering",
  title: "Healthy Offering",
  key: "healthy-offering",
  baseName: "Malevolent Offering",
  description:
    '"Pour out your lifesblood and channel the arcane, healing yourself or an ally in front of you for 3600 Health, while draining 1080 Health from yourself over 3 seconds.\\n\\nAfter casting, gain Minor Mending for 10 seconds, increasing your healing done by 8%."',
  icon: "/esoui/art/icons/ability_nightblade_011_a.dds",
  esoSkillId: 36144,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
