import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceBlur = {
  id: "019e6f53-a8c3-7796-8a76-680a9cd17faf",
  type: "page-type/temper-skill",
  slug: "vengeance-blur",
  title: "Vengeance Blur",
  key: "vengeance-blur",
  baseName: "Vengeance Blur",
  description:
    "Surround yourself in a phantasmic aura to gain Major Resolve and Minor Evasion, increasing your Physical and Spell Resistance by |cffffff5948|r and reducing your damage taken from area attacks by |cffffff10|r% for |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_009.dds",
  esoSkillId: 237632,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 1423,
  createdAt: "2026-05-28T16:03:34.211Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Resolve (Constant)",
    "<<2>> = Minor Evasion (Constant)",
    "<<3>> = 5948 (Constant)",
    "<<4>> = 10% (Constant)",
    "<<5>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
