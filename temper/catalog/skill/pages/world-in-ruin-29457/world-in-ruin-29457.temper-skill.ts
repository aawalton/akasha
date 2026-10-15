import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const worldInRuin29457 = {
  id: "019e6f53-aa00-7cad-ba57-78b0e8c6af0c",
  type: "page-type/temper-skill",
  slug: "world-in-ruin-29457",
  title: "World in Ruin",
  key: "world-in-ruin-29457",
  baseName: "World in Ruin",
  description:
    "Dragons leave naught but ash and ruin in their wake.\n\nIncreases your damage done with area and over time attacks by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_sorcerer_010.dds",
  esoSkillId: 29457,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/passive",
  hashPlace: 1627,
  createdAt: "2026-05-28T16:03:34.528Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3% (Constant)"],
} as const satisfies TemperSkill
