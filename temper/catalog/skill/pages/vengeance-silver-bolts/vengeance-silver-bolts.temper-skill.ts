import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceSilverBolts = {
  id: "019e6f53-a984-7ef7-a013-e47537a65c0c",
  type: "page-type/temper-skill",
  slug: "vengeance-silver-bolts",
  title: "Vengeance Silver Bolts",
  key: "vengeance-silver-bolts",
  baseName: "Vengeance Silver Bolts",
  description:
    "Fire a Dawnguard Vampire Hunter's crossbow bolt to strike an enemy, dealing |cffffff10017|r Physical Damage.",
  icon: "/esoui/art/icons/ability_fightersguild_003.dds",
  esoSkillId: 246070,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1557,
  createdAt: "2026-05-28T16:03:34.404Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 9450 Physical Damage (Constant)"],
} as const satisfies TemperSkill
