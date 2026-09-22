import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const enduringRays31739 = {
  id: "019e6f53-a17b-7dd2-b56d-c32f8afae8bc",
  type: "page-type/temper-skill",
  slug: "enduring-rays-31739",
  title: "Enduring Rays",
  key: "enduring-rays-31739",
  baseName: "Enduring Rays",
  description:
    '"Increases the duration of your Sun Fire, Eclipse, Solar Flare, and Nova abilities by |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_templar_020.dds",
  esoSkillId: 31739,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
