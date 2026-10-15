import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hideousClarity185240 = {
  id: "019e6f53-a318-7dab-8688-0f8918dd61ea",
  type: "page-type/temper-skill",
  slug: "hideous-clarity-185240",
  title: "Hideous Clarity",
  key: "hideous-clarity-185240",
  baseName: "Hideous Clarity",
  description:
    "You've stared too long into the abyss. When you generate Crux, you restore |cffffff112|r Magicka and Stamina.",
  icon: "/esoui/art/icons/passive_arcanist_10.dds",
  esoSkillId: 185240,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/passive",
  hashPlace: 633,
  createdAt: "2026-05-28T16:03:32.760Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 112 (Constant)"],
} as const satisfies TemperSkill
