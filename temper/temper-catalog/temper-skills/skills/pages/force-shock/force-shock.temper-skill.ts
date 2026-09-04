import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const forceShock = {
  id: "019e6f53-a22a-7169-ba45-ee192e534f73",
  pageTypeSlug: "temper-skill",
  slug: "force-shock",
  title: "Force Shock",
  key: "force-shock",
  baseName: "Force Shock",
  description:
    '"Focus all the elemental energies with your staff and blast an enemy for |cffffff2423|r Flame Damage, |cffffff2423|r Frost Damage, and |cffffff2423|r Shock Damage."',
  icon: "/esoui/art/icons/ability_destructionstaff_001.dds",
  esoSkillId: 46340,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
