import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSiphoningStrikes = {
  id: "019e6f53-a986-7591-8271-a13331ba287a",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-siphoning-strikes",
  title: "Vengeance Siphoning Strikes",
  key: "vengeance-siphoning-strikes",
  baseName: "Vengeance Siphoning Strikes",
  description:
    '"Channel a portion of your soul to convert Health to |cffffff2000|r Magicka and Stamina."',
  icon: "/esoui/art/icons/ability_nightblade_003.dds",
  esoSkillId: 237716,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-siphoning",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-siphoning",
} as const satisfies TemperSkill
