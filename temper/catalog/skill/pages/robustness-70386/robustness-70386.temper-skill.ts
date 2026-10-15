import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const robustness70386 = {
  id: "019e6f53-a666-7dcb-82bd-c1b4563d4351",
  type: "page-type/temper-skill",
  slug: "robustness-70386",
  title: "Robustness",
  key: "robustness-70386",
  baseName: "Robustness",
  description: "Increases your Health, Magicka, and Stamina Recovery by |cffffff30|r.",
  icon: "/esoui/art/icons/ability_sorcerer_018.dds",
  esoSkillId: 70386,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/racial-khajiit-skills",
  skillType: "temper-skill-type/passive",
  hashPlace: 1084,
  createdAt: "2026-05-28T16:03:33.606Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 30 (Constant)"],
} as const satisfies TemperSkill
