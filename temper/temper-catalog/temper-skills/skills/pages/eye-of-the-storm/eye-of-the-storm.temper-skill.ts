import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const eyeOfTheStorm = {
  id: "019e6226-00f0-757f-946c-09d7fdb66aa5",
  pageTypeSlug: "temper-skill",
  slug: "eye-of-the-storm",
  title: "Eye of the Storm",
  key: "eye-of-the-storm",
  baseName: "Elemental Storm",
  description:
    '"Create a cataclysmic storm above you that builds for 2 seconds then lays waste to all enemies nearby, dealing 1799 Magic Damage every 1 second for 7 seconds."',
  icon: "/esoui/art/icons/ability_destructionstaff_012_a.dds",
  esoSkillId: 86534,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-destruction-staff",
  skillType: "ultimate",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
