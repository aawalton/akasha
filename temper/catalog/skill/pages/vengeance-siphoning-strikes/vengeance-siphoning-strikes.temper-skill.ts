import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceSiphoningStrikes = {
  id: "019e6f53-a986-7591-8271-a13331ba287a",
  type: "page-type/temper-skill",
  slug: "vengeance-siphoning-strikes",
  title: "Vengeance Siphoning Strikes",
  key: "vengeance-siphoning-strikes",
  baseName: "Vengeance Siphoning Strikes",
  description:
    "Channel a portion of your soul to convert Health to |cffffff2000|r Magicka and Stamina.",
  icon: "/esoui/art/icons/ability_nightblade_003.dds",
  esoSkillId: 237716,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1558,
  createdAt: "2026-05-28T16:03:34.406Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 2000 (Constant)"],
} as const satisfies TemperSkill
