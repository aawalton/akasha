import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceBoneyard = {
  id: "019e6f53-a8cb-7ffc-ac4b-3b5405a72e96",
  type: "page-type/temper-skill",
  slug: "vengeance-boneyard",
  title: "Vengeance Boneyard",
  key: "vengeance-boneyard",
  baseName: "Vengeance Boneyard",
  description:
    "Desecrate the ground at the target location, dealing |cffffff8820|r Frost Damage to up to 3 enemies inside and applying Minor Vulnerability for |cffffff5|r seconds, increasing their damage taken by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_necromancer_004.dds",
  esoSkillId: 238095,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 1429,
  createdAt: "2026-05-28T16:03:34.219Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 7875 Frost Damage (Constant)",
    "<<2>> = 12 (Constant)",
    "<<3>> = Minor Vulnerability (Constant)",
    "<<4>> = 5 seconds (Constant)",
    "<<5>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
