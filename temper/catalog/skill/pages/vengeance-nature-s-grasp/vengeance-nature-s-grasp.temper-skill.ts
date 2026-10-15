import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceNatureSGrasp = {
  id: "019e6f53-a943-70c7-a90a-e895ad1f133c",
  type: "page-type/temper-skill",
  slug: "vengeance-nature-s-grasp",
  title: "Vengeance Nature's Grasp",
  key: "vengeance-nature-s-grasp",
  baseName: "Vengeance Nature's Grasp",
  description:
    "Launch a vine to swing yourself to an ally, healing them for |cffffff13388|r Health.",
  icon: "/esoui/art/icons/ability_warden_011.dds",
  esoSkillId: 238071,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 1511,
  createdAt: "2026-05-28T16:03:34.339Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 13125 (Constant)"],
} as const satisfies TemperSkill
