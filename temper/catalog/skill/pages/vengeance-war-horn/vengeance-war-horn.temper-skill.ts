import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceWarHorn = {
  id: "019e6f53-a9b0-712c-bb88-c3f7402dde77",
  type: "page-type/temper-skill",
  slug: "vengeance-war-horn",
  title: "Vengeance War Horn",
  key: "vengeance-war-horn",
  baseName: "Vengeance War Horn",
  description:
    "Sound a war horn to rally your forces, increasing you and up to 5 of your group members' Health, Magicka, and Stamina Recovery by |cffffff2500|r for |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_ava_003.dds",
  esoSkillId: 244644,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-alliance-war-assault",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1587,
  createdAt: "2026-05-28T16:03:34.448Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 2500 (Constant)", "<<2>> = 6 seconds (Constant)"],
} as const satisfies TemperSkill
