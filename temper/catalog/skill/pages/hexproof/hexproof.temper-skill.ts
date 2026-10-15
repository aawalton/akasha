import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hexproof = {
  id: "019e6245-a6a4-7fbc-b1ab-59825e996907",
  type: "page-type/temper-skill",
  slug: "hexproof",
  title: "Hexproof",
  key: "hexproof",
  baseName: "Expunge",
  description:
    "Embrace the power of death, removing up to 4 negative effects from yourself.\n\nWhile slotted, the cost of all your abilities are reduced by 3%.",
  icon: "/esoui/art/icons/ability_necromancer_014_a.dds",
  esoSkillId: 40117919,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 629,
  createdAt: "2026-05-26T03:13:12.356Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 4 (Constant)", "<<2>> = 3% (Constant)"],
} as const satisfies TemperSkill
