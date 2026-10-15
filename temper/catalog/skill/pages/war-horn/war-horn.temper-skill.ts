import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const warHorn = {
  id: "019e6f53-a9d3-7e3d-ae39-e881df124486",
  type: "page-type/temper-skill",
  slug: "war-horn",
  title: "War Horn",
  key: "war-horn",
  baseName: "War Horn",
  description:
    "Sound a war horn to rally your forces, increasing you and your group's Max Magicka and Max Stamina by |cffffff10|r% for |cffffff30|r seconds.",
  icon: "/esoui/art/icons/ability_ava_003.dds",
  esoSkillId: 38563,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1607,
  createdAt: "2026-05-28T16:03:34.483Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 10% (Constant)", "<<2>> = 27 seconds (Constant)"],
} as const satisfies TemperSkill
