import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const forwardMomentum = {
  id: "019e6226-00f6-7058-b41d-ad3838271d3a",
  type: "page-type/temper-skill",
  slug: "forward-momentum",
  title: "Forward Momentum",
  key: "forward-momentum",
  baseName: "Momentum",
  description:
    "Focus your strength and resolve to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20%, as well as gaining Minor Endurance, increasing your Stamina Recovery by 15% for 40 seconds.\n\nActivating this ability removes all snares and immobilizations from you and grants immunity to them for 4 seconds.",
  icon: "/esoui/art/icons/ability_2handed_005_a.dds",
  esoSkillId: 39892,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 538,
  createdAt: "2026-05-26T02:38:38.326Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Brutality (Constant)",
    "<<2>> = Minor Endurance (Constant)",
    "<<3>> = 1 minute (Constant)",
    "<<4>> = 20% (Constant)",
    "<<5>> = 15% (Constant)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
