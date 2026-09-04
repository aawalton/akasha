import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeguardOfStillWaters = {
  id: "019e6245-a71c-7c2f-a759-3f3695bd88d5",
  pageTypeSlug: "temper-skill",
  slug: "runeguard-of-still-waters",
  title: "Runeguard of Still Waters",
  key: "runeguard-of-still-waters",
  baseName: "Runic Defense",
  description:
    '"Cast forth a complex rune granting you and your group members Minor Resolve for 20 seconds, increasing your Armor by 2974. After 1 second, the spellweave immobilizes enemies within 7 meters for 3 seconds.\\n\\nYou gain Minor Protection for 20 seconds, reducing your damage taken by 5%.\\n\\nThe first time you are damaged while below 50% Health, the Minor Protection is consumed to heal you for 4800 Health, scaling off your Max Health."',
  icon: "/esoui/art/icons/ability_arcanist_010_a.dds",
  esoSkillId: 40183401,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
