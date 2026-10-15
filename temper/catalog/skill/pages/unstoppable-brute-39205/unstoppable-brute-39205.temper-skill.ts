import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const unstoppableBrute39205 = {
  id: "019e6f53-a89e-73e7-90ac-2c96b84d5b4d",
  type: "page-type/temper-skill",
  slug: "unstoppable-brute-39205",
  title: "Unstoppable Brute",
  key: "unstoppable-brute-39205",
  baseName: "Unstoppable",
  description:
    "Intensify your physical presence to gain Major Resolve, increasing your Physical and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.\n\nWhile this effect persists, each piece of Heavy Armor worn decreases the cost of Break Free by |cffffff5|r%.\n\nAlso grants you immunity to knockback and disabling effects for |cffffff6|r seconds, but reduces your Movement Speed by |cffffff65|r% for the duration.",
  icon: "/esoui/art/icons/ability_armor_001_a.dds",
  esoSkillId: 39205,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 1,
  rank: 22,
  skillLineId: "temper-skill-line/armor-heavy-armor",
  skillType: "temper-skill-type/active",
  hashPlace: 1398,
  createdAt: "2026-05-28T16:03:34.174Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5948 (Constant)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 6 seconds (Constant)",
    "<<5>> = 65% (Constant)",
  ],
} as const satisfies TemperSkill
