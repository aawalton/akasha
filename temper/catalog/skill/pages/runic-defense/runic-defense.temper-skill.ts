import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runicDefense = {
  id: "019e6f53-a696-762a-926b-d41e22fe0311",
  type: "page-type/temper-skill",
  slug: "runic-defense",
  title: "Runic Defense",
  key: "runic-defense",
  baseName: "Runic Defense",
  description:
    "Cast forth a complex rune granting you and your group members Minor Resolve for |cffffff20|r seconds, increasing your Armor by |cffffff2974|r.\n\nYou gain Minor Protection for |cffffff20|r seconds, reducing your damage taken by |cffffff5|r%.\n\nThe first time you are damaged while below 50% Health, the Minor Protection is consumed to heal you for |cffffff6033|r Health, scaling off your Max Health.",
  icon: "/esoui/art/icons/ability_arcanist_010.dds",
  esoSkillId: 185912,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1112,
  createdAt: "2026-05-28T16:03:33.654Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Resolve (Constant)",
    "<<2>> = 17 seconds (Constant)",
    "<<3>> = 2974 (Constant)",
    "<<4>> = Minor Protection (Constant)",
    "<<5>> = 17 seconds (Constant)",
    "<<6>> = 5% (Constant)",
    "<<7>> = 0.3 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
