import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceCaltrops = {
  id: "019e6f53-a8ce-7d07-8ef0-b6cd6e589994",
  type: "page-type/temper-skill",
  slug: "vengeance-caltrops",
  title: "Vengeance Caltrops",
  key: "vengeance-caltrops",
  baseName: "Vengeance Caltrops",
  description:
    "Hurl a ball of caltrops that scatter over the target area, dealing |cffffff7056|r Physical Damage to up to 3 enemies inside, and reducing their Movement Speed by |cffffff50|r% for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_ava_001.dds",
  esoSkillId: 244514,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 1431,
  createdAt: "2026-05-28T16:03:34.222Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6300 Physical Damage (Constant)",
    "<<2>> = 6 (Constant)",
    "<<3>> = 50% (Constant)",
    "<<4>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
