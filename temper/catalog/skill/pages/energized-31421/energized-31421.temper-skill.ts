import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const energized31421 = {
  id: "019e6f53-a186-7448-8f8e-0b10d18c1459",
  type: "page-type/temper-skill",
  slug: "energized-31421",
  title: "Energized",
  key: "energized-31421",
  baseName: "Energized",
  description: "Increases your Physical and Shock Damage by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_sorcerer_015.dds",
  esoSkillId: 31421,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/passive",
  hashPlace: 440,
  createdAt: "2026-05-28T16:03:32.358Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3% (Constant)"],
} as const satisfies TemperSkill
