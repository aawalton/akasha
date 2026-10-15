import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mirage35414 = {
  id: "019e6f53-a48d-706b-9209-e7c14543e27a",
  type: "page-type/temper-skill",
  slug: "mirage-35414",
  title: "Mirage",
  key: "mirage-35414",
  baseName: "Blur",
  description:
    "Surround yourself in a phantasmic aura to gain Major Evasion and Minor Resolve, reducing damage from area attacks by |cffffff20|r% and increasing your Physical and Spell Resistance by |cffffff2974|r for |cffffff20|r seconds.\n\nWhile active, taking direct damage reduces the cost of your next Roll Dodge by |cffffff10|r%, up to a maximum of |cffffff100|r%. This effect can stack up to once every half second.",
  icon: "/esoui/art/icons/ability_nightblade_009_a.dds",
  esoSkillId: 35414,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 831,
  createdAt: "2026-05-28T16:03:33.133Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20% (Constant)",
    "<<2>> = 2974 (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = Roll Dodge (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
