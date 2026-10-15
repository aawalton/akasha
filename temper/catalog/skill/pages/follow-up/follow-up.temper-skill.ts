import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const followUp = {
  id: "019e6226-00f2-7c16-9995-54924f771bb5",
  type: "page-type/temper-skill",
  slug: "follow-up",
  title: "Follow Up",
  key: "follow-up",
  baseName: "Follow Up",
  description:
    "When you complete a fully-charged Heavy Attack, your damage done with Two Handed attacks increases by 10% for 4 seconds.",
  icon: "/esoui/art/icons/passive_dragonknight_016.dds",
  esoSkillId: 45446,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 529,
  createdAt: "2026-05-26T02:38:38.322Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 10% (Constant)", "<<2>> = 4 seconds (Constant)"],
} as const satisfies TemperSkill
