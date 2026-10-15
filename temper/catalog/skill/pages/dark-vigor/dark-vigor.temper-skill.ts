import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const darkVigor = {
  id: "019e6245-a640-7984-a547-a860a1b1f4b9",
  type: "page-type/temper-skill",
  slug: "dark-vigor",
  title: "Dark Vigor",
  key: "dark-vigor",
  baseName: "Dark Vigor",
  description:
    "Increases your Max Health by 5% for each Shadow ability slotted.\n\nCurrent bonus: 0%.",
  icon: "/esoui/art/icons/ability_sorcerer_044.dds",
  esoSkillId: 45084,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 317,
  createdAt: "2026-05-26T03:13:12.256Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5% (Constant)",
    "<<2>> = 5 Shadow (Shadow Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
