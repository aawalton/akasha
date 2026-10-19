import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const masterAssassin = {
  id: "019e6245-a6ca-7f43-b9f3-98f63375c08b",
  type: "page-type/temper-skill",
  slug: "master-assassin",
  title: "Master Assassin",
  key: "master-assassin",
  baseName: "Master Assassin",
  description:
    "Increases your Critical Chance rating against enemies you are flanking by 1448, increasing your chance to critically strike by |6.6%.",
  icon: "/esoui/art/icons/passive_weapon_026.dds",
  esoSkillId: 45038,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/passive",
  hashPlace: 806,
  createdAt: "2026-05-26T03:13:12.394Z",
  updatedAt: "2026-10-19T19:39:00.218Z",
  equations: ["<<1>> = 1448 (Constant)"],
} as const satisfies TemperSkill
