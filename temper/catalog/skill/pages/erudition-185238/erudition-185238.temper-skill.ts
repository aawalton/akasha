import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const erudition185238 = {
  id: "019e6f53-a198-793f-a28e-6208a11e3aa1",
  type: "page-type/temper-skill",
  slug: "erudition-185238",
  title: "Erudition",
  key: "erudition-185238",
  baseName: "Erudition",
  description:
    '"Knowledge is power. Your excessive scholarship increases your Magicka and Stamina Recovery by |cffffff9|r%."',
  icon: "/esoui/art/icons/passive_arcanist_11.dds",
  esoSkillId: 185238,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
