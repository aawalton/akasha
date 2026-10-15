import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vineduskTraining = {
  id: "019e6226-011e-7cc1-b196-68a140695845",
  type: "page-type/temper-skill",
  slug: "vinedusk-training",
  title: "Vinedusk Training",
  key: "vinedusk-training",
  baseName: "Vinedusk Training",
  description:
    "Increases your damage done by 5% against enemies 15 meters or closer.\n\nIncreases your Critical Chance rating by 1314 against enemies further than 15 meters.",
  icon: "/esoui/art/icons/ability_weapon_025.dds",
  esoSkillId: 45494,
  isMorph: false,
  learnedLevel: 34,
  lineRankNeeded: 34,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 1599,
  createdAt: "2026-05-26T02:38:38.366Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 5% (Constant)", "<<2>> = 1314 (Constant)"],
} as const satisfies TemperSkill
