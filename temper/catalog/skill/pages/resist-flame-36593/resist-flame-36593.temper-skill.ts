import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const resistFlame36593 = {
  id: "019e6f53-a610-7fef-a334-ebfccef480c9",
  type: "page-type/temper-skill",
  slug: "resist-flame-36593",
  title: "Resist Flame",
  key: "resist-flame-36593",
  baseName: "Resist Flame",
  description: "Increases your Flame Resistance by |cffffff1540|r.",
  icon: "/esoui/art/icons/ability_sorcerer_010.dds",
  esoSkillId: 36593,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/racial-dark-elf-skills",
  skillType: "temper-skill-type/passive",
  hashPlace: 1037,
  createdAt: "2026-05-28T16:03:33.520Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 1540 (Constant)"],
} as const satisfies TemperSkill
