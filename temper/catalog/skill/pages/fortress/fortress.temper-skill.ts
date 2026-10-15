import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fortress = {
  id: "019e6226-00f5-735a-a4e2-5efcff7c22ed",
  type: "page-type/temper-skill",
  slug: "fortress",
  title: "Fortress",
  key: "fortress",
  baseName: "Fortress",
  description:
    "Reduces the Stamina cost of your One Hand and Shield abilities by 15% and reduces the cost of blocking by 36%.",
  icon: "/esoui/art/icons/ability_weapon_028.dds",
  esoSkillId: 45471,
  isMorph: false,
  learnedLevel: 34,
  lineRankNeeded: 34,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
  hashPlace: 536,
  createdAt: "2026-05-26T02:38:38.325Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 15% (Constant)"],
} as const satisfies TemperSkill
