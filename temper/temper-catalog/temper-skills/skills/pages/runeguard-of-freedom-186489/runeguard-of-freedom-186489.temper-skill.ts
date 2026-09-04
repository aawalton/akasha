import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeguardOfFreedom186489 = {
  id: "019e6f53-a68d-7327-8a46-ee75627d3cb3",
  pageTypeSlug: "temper-skill",
  slug: "runeguard-of-freedom-186489",
  title: "Runeguard of Freedom",
  key: "runeguard-of-freedom-186489",
  baseName: "Runic Defense",
  description:
    '"Cast forth a complex rune granting you and your group members Minor Resolve for |cffffff20|r seconds, increasing your Armor by |cffffff2974|r.\\n\\nYou gain Minor Protection for |cffffff20|r seconds, reducing your damage taken by |cffffff5|r%.\\n\\nThe first time you are damaged while below 50% Health, Minor Protection is consumed to heal you for |cffffff3016|r Health, scaling off your Max Health, and gain |cffffff3300|r Armor and Crowd Control Immunity for |cffffff7|r seconds. This immunity can occur once every |cffffff30|r seconds."',
  icon: "/esoui/art/icons/ability_arcanist_010_b.dds",
  esoSkillId: 186489,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
