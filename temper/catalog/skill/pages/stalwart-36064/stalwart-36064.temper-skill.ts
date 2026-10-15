import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const stalwart36064 = {
  id: "019e6f53-a7ab-77f6-b730-0d99eb2a87c4",
  type: "page-type/temper-skill",
  slug: "stalwart-36064",
  title: "Stalwart",
  key: "stalwart-36064",
  baseName: "Stalwart",
  description:
    "Increases your Max Stamina by |cffffff500|r.\n\nWhen you take damage, you gain |cffffff1|r Ultimate.  This effect can occur once every |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_018.dds",
  esoSkillId: 36064,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/racial-nord-skills",
  skillType: "temper-skill-type/passive",
  hashPlace: 1264,
  createdAt: "2026-05-28T16:03:33.931Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 500 (Constant)", "<<2>> = 1 (Constant)", "<<3>> = 10 seconds (Constant)"],
} as const satisfies TemperSkill
