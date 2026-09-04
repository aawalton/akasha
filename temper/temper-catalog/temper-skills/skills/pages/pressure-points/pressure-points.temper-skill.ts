import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const pressurePoints = {
  id: "019e6245-a6ef-7e0f-b101-e8d5a095fc75",
  pageTypeSlug: "temper-skill",
  slug: "pressure-points",
  title: "Pressure Points",
  key: "pressure-points",
  baseName: "Pressure Points",
  description:
    '"Increases your Critical Chance rating by 548 for each Assassination ability slotted, increasing your chance to critically strike by 2.5% per ability.\\n\\nCurrent bonus: 0."',
  icon: "/esoui/art/icons/passive_weapon_015.dds",
  esoSkillId: 45053,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-assassination",
  skillType: "passive",
  subcategoryId: "nightblade-assassination",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
