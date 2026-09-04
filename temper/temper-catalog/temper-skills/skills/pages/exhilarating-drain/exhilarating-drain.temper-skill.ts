import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const exhilaratingDrain = {
  id: "019e6251-4cb3-70e6-99d7-b86ffe736bf7",
  pageTypeSlug: "temper-skill",
  slug: "exhilarating-drain",
  title: "Exhilarating Drain",
  key: "exhilarating-drain",
  baseName: "Vampiric Drain",
  description:
    '"Siphon away your enemies\' vitality, dealing 870 Magic Damage, healing you for 25% of your missing Health, and generating 5 Ultimate every 1 second for 3 seconds.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_u26_vampire_03_b.dds",
  esoSkillId: 40137259,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
