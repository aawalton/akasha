import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fatedFortune = {
  id: "019e6245-a680-71b7-b269-65d3840a53b0",
  type: "page-type/temper-skill",
  slug: "fated-fortune",
  title: "Fated Fortune",
  key: "fated-fortune",
  baseName: "Fated Fortune",
  description:
    "Warp fate when you generate or consume Crux, increasing your Critical Damage and Critical Healing by 12% for 7 seconds.",
  icon: "/esoui/art/icons/passive_arcanist_04.dds",
  esoSkillId: 184847,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
  hashPlace: 500,
  createdAt: "2026-05-26T03:13:12.320Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 12% (Constant)", "<<2>> = 7 seconds (Constant)"],
} as const satisfies TemperSkill
