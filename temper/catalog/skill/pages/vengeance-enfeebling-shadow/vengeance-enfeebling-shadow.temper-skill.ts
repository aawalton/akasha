import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceEnfeeblingShadow = {
  id: "019e6f53-a8fe-74d9-8b69-dce2d83efeea",
  type: "page-type/temper-skill",
  slug: "vengeance-enfeebling-shadow",
  title: "Vengeance Enfeebling Shadow",
  key: "vengeance-enfeebling-shadow",
  baseName: "Vengeance Enfeebling Shadow",
  description:
    "Infuse your weapon with sinister shadow and stab an enemy, dealing |cffffff5565|r Magic Damage and applying Major Maim to them for |cffffff6|r seconds, reducing their damage done by |cffffff10|r%.",
  icon: "/esoui/art/icons/achievement_thievesguild_040.dds",
  esoSkillId: 237700,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 1463,
  createdAt: "2026-05-28T16:03:34.270Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5250 Magic Damage (Constant)",
    "<<2>> = Major Maim (Constant)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
