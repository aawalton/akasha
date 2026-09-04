import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const monarch = {
  id: "019e6251-4cd1-7e7f-ae85-54034cf01779",
  pageTypeSlug: "temper-skill",
  slug: "monarch",
  title: "Monarch",
  key: "monarch",
  baseName: "Monarch",
  description:
    '"Increases your healing received while in your campaign, depending on how many Home Keeps you own.\\n\\n1 or less Keep: 25%\\n2 Keeps: 30%\\n3 Keeps: 35%\\n4 Keeps: 40%\\n5 Keeps: 45%\\n6 Keeps: 50%"',
  icon: "/esoui/art/icons/ability_sorcerer_060.dds",
  esoSkillId: 39625,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-emperor",
  skillType: "passive",
  subcategoryId: "alliance-war-emperor",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
