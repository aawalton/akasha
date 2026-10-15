import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const unflinchingRage = {
  id: "019e624a-12e5-7b32-ae3a-936b53bb3044",
  type: "page-type/temper-skill",
  slug: "unflinching-rage",
  title: "Unflinching Rage",
  key: "unflinching-rage",
  baseName: "Unflinching Rage",
  description:
    "Increases your Max Health by 1000.\n\nWhen you deal damage, you heal for 2125 Health.  This can occur once every 4 seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_018.dds",
  esoSkillId: 84672,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/racial-orc-skills",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
  hashPlace: 1385,
  createdAt: "2026-05-26T03:18:02.213Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 1000 (Constant)", "<<2>> = 2125 (Constant)", "<<3>> = 4 seconds (Constant)"],
} as const satisfies TemperSkill
