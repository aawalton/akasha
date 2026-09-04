import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeguardOfStillWaters183401 = {
  id: "019e6f53-a690-7832-b399-ac3e03876ea6",
  pageTypeSlug: "temper-skill",
  slug: "runeguard-of-still-waters-183401",
  title: "Runeguard of Still Waters",
  key: "runeguard-of-still-waters-183401",
  baseName: "Runic Defense",
  description:
    '"Cast forth a complex rune granting you and your group members Minor Resolve for |cffffff20|r seconds, increasing your Armor by |cffffff2974|r. After |cffffff1|r second, the spellweave immobilizes enemies within 7 meters for |cffffff3|r seconds.\\n\\nYou gain Minor Protection for |cffffff20|r seconds, reducing your damage taken by |cffffff5|r%.\\n\\nThe first time you are damaged while below 50% Health, the Minor Protection is consumed to heal you for |cffffff6033|r Health, scaling off your Max Health."',
  icon: "/esoui/art/icons/ability_arcanist_010_a.dds",
  esoSkillId: 183401,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
