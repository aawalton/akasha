import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSilverBolts = {
  id: "019e6f53-a984-7ef7-a013-e47537a65c0c",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-silver-bolts",
  title: "Vengeance Silver Bolts",
  key: "vengeance-silver-bolts",
  baseName: "Vengeance Silver Bolts",
  description:
    '"Fire a Dawnguard Vampire Hunter\'s crossbow bolt to strike an enemy, dealing |cffffff10017|r Physical Damage."',
  icon: "/esoui/art/icons/ability_fightersguild_003.dds",
  esoSkillId: 246070,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-fighters-guild",
  skillType: "active",
  subcategoryId: "vengeance-guild-fighters-guild",
} as const satisfies TemperSkill
