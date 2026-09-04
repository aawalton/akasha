import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const advancedSpecies = {
  id: "019e6245-a5e5-7e39-aa0f-613701e21698",
  pageTypeSlug: "temper-skill",
  slug: "advanced-species",
  title: "Advanced Species",
  key: "advanced-species",
  baseName: "Advanced Species",
  description:
    '"Increases your Critical Damage by 5% for each Animal Companion ability slotted.\\n\\nCurrent Bonus: 0%."',
  icon: "/esoui/art/icons/passive_warden_011.dds",
  esoSkillId: 86069,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-animal-companions",
  skillType: "passive",
  subcategoryId: "warden-animal-companions",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
