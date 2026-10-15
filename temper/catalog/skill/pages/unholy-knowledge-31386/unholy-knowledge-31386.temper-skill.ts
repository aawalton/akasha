import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const unholyKnowledge31386 = {
  id: "019e6f53-a887-7383-98ff-92e3db29f08f",
  type: "page-type/temper-skill",
  slug: "unholy-knowledge-31386",
  title: "Unholy Knowledge",
  key: "unholy-knowledge-31386",
  baseName: "Unholy Knowledge",
  description:
    "Reduces the Health, Magicka, and Stamina costs of your non Core Combat abilities by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_sorcerer_045.dds",
  esoSkillId: 31386,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/passive",
  hashPlace: 1387,
  createdAt: "2026-05-28T16:03:34.151Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3% (Constant)"],
} as const satisfies TemperSkill
