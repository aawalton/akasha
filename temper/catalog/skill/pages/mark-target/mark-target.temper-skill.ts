import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const markTarget = {
  id: "019e6f53-a455-775d-b90e-f0c22d85bd16",
  type: "page-type/temper-skill",
  slug: "mark-target",
  title: "Mark Target",
  key: "mark-target",
  baseName: "Mark Target",
  description:
    "Expose an enemy's weaknesses by applying Major Breach to them, reducing Physical Resistance and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.\n\nWhen a marked enemy dies, you heal to full Health.\n\nYou can only have one Mark Target active at a time.",
  icon: "/esoui/art/icons/ability_nightblade_014.dds",
  esoSkillId: 33357,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 801,
  createdAt: "2026-05-28T16:03:33.077Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Breach (Constant)",
    "<<2>> = 5948 (Constant)",
    "<<3>> = 17 seconds (Constant)",
    "<<4>> = Mark Target (Constant)",
  ],
} as const satisfies TemperSkill
