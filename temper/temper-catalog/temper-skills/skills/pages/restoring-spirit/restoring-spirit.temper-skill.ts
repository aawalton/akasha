import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const restoringSpirit = {
  id: "019e6245-a710-7fa3-bfbe-400e38ff895b",
  pageTypeSlug: "temper-skill",
  slug: "restoring-spirit",
  title: "Restoring Spirit",
  key: "restoring-spirit",
  baseName: "Restoring Spirit",
  description:
    '"Reduces the Health, Magicka, Stamina, and Ultimate costs of your abilities by 5%."',
  icon: "/esoui/art/icons/ability_templar_014.dds",
  esoSkillId: 45212,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-dawns-wrath",
  skillType: "passive",
  subcategoryId: "templar-dawns-wrath",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
