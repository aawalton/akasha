import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeancePathOfDarkness = {
  id: "019e6f53-a94e-7477-b9a5-3528612e2893",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-path-of-darkness",
  title: "Vengeance Path of Darkness",
  key: "vengeance-path-of-darkness",
  baseName: "Vengeance Path of Darkness",
  description:
    '"Create a corridor of shadows, granting you and up to 3 group members Major Expedition for |cffffff4|r seconds, increasing Movement Speed by |cffffff30|r%."',
  icon: "/esoui/art/icons/ability_nightblade_010.dds",
  esoSkillId: 237647,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-shadow",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-shadow",
} as const satisfies TemperSkill
