import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const corpseConsumption = {
  id: "019e6245-a621-7609-a453-0fec49dedd55",
  type: "page-type/temper-skill",
  slug: "corpse-consumption",
  title: "Corpse Consumption",
  key: "corpse-consumption",
  baseName: "Corpse Consumption",
  description:
    "When you consume a corpse, you generate 10 Ultimate. This effect can occur once every 16 seconds.",
  icon: "/esoui/art/icons/passive_necromancer_011.dds",
  esoSkillId: 116285,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 251,
  createdAt: "2026-05-26T03:13:12.225Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 10 (Constant)", "<<2>> = 16 seconds (Constant)"],
} as const satisfies TemperSkill
