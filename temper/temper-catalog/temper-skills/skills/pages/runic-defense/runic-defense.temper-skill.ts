import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runicDefense = {
  id: "019e6f53-a696-762a-926b-d41e22fe0311",
  pageTypeSlug: "temper-skill",
  slug: "runic-defense",
  title: "Runic Defense",
  key: "runic-defense",
  baseName: "Runic Defense",
  description:
    '"Cast forth a complex rune granting you and your group members Minor Resolve for |cffffff20|r seconds, increasing your Armor by |cffffff2974|r.\\n\\nYou gain Minor Protection for |cffffff20|r seconds, reducing your damage taken by |cffffff5|r%.\\n\\nThe first time you are damaged while below 50% Health, the Minor Protection is consumed to heal you for |cffffff6033|r Health, scaling off your Max Health."',
  icon: "/esoui/art/icons/ability_arcanist_010.dds",
  esoSkillId: 185912,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
