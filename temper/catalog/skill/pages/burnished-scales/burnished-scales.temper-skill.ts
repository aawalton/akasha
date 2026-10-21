import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const burnishedScales = {
  id: "019e6f53-9fa6-7400-855c-86ba606dfb23",
  type: "page-type/temper-skill",
  slug: "burnished-scales",
  title: "Burnished Scales",
  key: "burnished-scales",
  baseName: "Burnished Scales",
  description:
    "A Dragon's scales will turn aside arrow, fire, and blade.\n\nIncreases the amount of damage you block by |cffffff4|r%.",
  icon: "/esoui/art/icons/ability_dragonknight_020.dds",
  esoSkillId: 29455,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/passive",
  effects: "jsonl",
  hashPlace: 176,
  createdAt: "2026-05-28T16:03:31.878Z",
  updatedAt: "2026-10-21T03:25:32.521Z",
  equations: ["<<1>> = 4% (Constant)"],
} as const satisfies TemperSkill
