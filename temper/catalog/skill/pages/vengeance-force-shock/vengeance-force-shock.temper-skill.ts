import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceForceShock = {
  id: "019e6f53-a912-72b8-90dd-e7dfb17bcfb2",
  type: "page-type/temper-skill",
  slug: "vengeance-force-shock",
  title: "Vengeance Force Shock",
  key: "vengeance-force-shock",
  baseName: "Vengeance Force Shock",
  description:
    "Focus on one of the elemental energies with your staff and blast an enemy for |cffffff10017|r Flame Damage, |cffffff10017|r Frost Damage, or |cffffff10017|r Shock Damage.",
  icon: "/esoui/art/icons/ability_destructionstaff_001.dds",
  esoSkillId: 241291,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1477,
  createdAt: "2026-05-28T16:03:34.290Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 9450 Flame Damage (Constant)",
    "<<2>> = 9450 Frost Damage (Constant)",
    "<<3>> = 9450 Shock Damage (Constant)",
  ],
} as const satisfies TemperSkill
