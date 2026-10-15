import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceCriticalCharge = {
  id: "019e6f53-a8dc-7c38-b41a-b2f3a5404341",
  type: "page-type/temper-skill",
  slug: "vengeance-critical-charge",
  title: "Vengeance Critical Charge",
  key: "vengeance-critical-charge",
  baseName: "Vengeance Critical Charge",
  description:
    "Launch across the earth and smash an enemy, dealing |cffffff6678|r Physical Damage. \n\nThis attack is always a Critical Strike.",
  icon: "/esoui/art/icons/ability_2handed_003.dds",
  esoSkillId: 240459,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 1440,
  createdAt: "2026-05-28T16:03:34.236Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 6300 Physical Damage (Constant)"],
} as const satisfies TemperSkill
