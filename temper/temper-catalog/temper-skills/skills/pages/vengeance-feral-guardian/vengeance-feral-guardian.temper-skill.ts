import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFeralGuardian = {
  id: "019e6f53-a90b-70b4-8531-b5b493a031b0",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-feral-guardian",
  title: "Vengeance Feral Guardian",
  key: "vengeance-feral-guardian",
  baseName: "Vengeance Feral Guardian",
  description:
    '"Rouse a grizzly to maul an enemy for |cffffff15582|r Magic Damage. Deals |cffffff100|r% more damage to enemies below |cffffff25|r% Health."',
  icon: "/esoui/art/icons/ability_warden_018.dds",
  esoSkillId: 238043,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-animal-companions",
  skillType: "ultimate",
  subcategoryId: "vengeance-warden-animal-companions",
} as const satisfies TemperSkill
