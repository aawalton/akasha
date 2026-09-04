import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalStorm = {
  id: "019e6f53-a121-7d07-808e-12d99a4acae7",
  pageTypeSlug: "temper-skill",
  slug: "elemental-storm",
  title: "Elemental Storm",
  key: "elemental-storm",
  baseName: "Elemental Storm",
  description:
    '"Create a cataclysmic storm at the target location that builds for |cffffff2|r seconds then lays waste to all enemies in the area, dealing |cffffff6057|r Magic Damage every |cffffff1|r second for |cffffff7|r seconds."',
  icon: "/esoui/art/icons/ability_destructionstaff_012.dds",
  esoSkillId: 83619,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "weapon-destruction-staff",
  skillType: "ultimate",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
