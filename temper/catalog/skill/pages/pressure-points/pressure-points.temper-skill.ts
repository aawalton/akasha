import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pressurePoints = {
  id: "019e6245-a6ef-7e0f-b101-e8d5a095fc75",
  type: "page-type/temper-skill",
  slug: "pressure-points",
  title: "Pressure Points",
  key: "pressure-points",
  baseName: "Pressure Points",
  description:
    "Increases your Critical Chance rating by 548 for each Assassination ability slotted, increasing your chance to critically strike by 2.5% per ability.\n\nCurrent bonus: 0.",
  icon: "/esoui/art/icons/passive_weapon_015.dds",
  esoSkillId: 45053,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 928,
  createdAt: "2026-05-26T03:13:12.431Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 438 (Constant)",
    "<<2>> = 2% (Constant)",
    "<<3>> = 438 Assassin (Assassination Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
