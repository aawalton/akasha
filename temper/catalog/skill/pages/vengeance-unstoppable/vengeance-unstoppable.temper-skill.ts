import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceUnstoppable = {
  id: "019e6f53-a9a5-7ec3-843d-41449c695493",
  type: "page-type/temper-skill",
  slug: "vengeance-unstoppable",
  title: "Vengeance Unstoppable",
  key: "vengeance-unstoppable",
  baseName: "Vengeance Unstoppable",
  description:
    "Intensify your physical presence to gain Major Resolve, increasing your Physical and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.\n\nAlso grants you immunity to knockback and disabling effects for |cffffff7|r seconds, but reduces your Movement Speed by |cffffff65|r% for the duration.",
  icon: "/esoui/art/icons/ability_armor_001.dds",
  esoSkillId: 247596,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-armor",
  skillType: "temper-skill-type/active",
  hashPlace: 1580,
  createdAt: "2026-05-28T16:03:34.437Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Resolve (Constant)",
    "<<2>> = 5948 (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 7 seconds (Constant)",
    "<<5>> = 65% (Constant)",
  ],
} as const satisfies TemperSkill
