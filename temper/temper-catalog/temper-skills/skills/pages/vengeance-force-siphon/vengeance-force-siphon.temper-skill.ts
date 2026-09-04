import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceForceSiphon = {
  id: "019e6f53-a913-7a18-bdba-8310acd56e77",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-force-siphon",
  title: "Vengeance Force Siphon",
  key: "vengeance-force-siphon",
  baseName: "Vengeance Force Siphon",
  description:
    '"Focus your staff\'s power to apply Minor Lifesteal and Minor Magickasteal to an enemy for |cffffff20|r seconds, healing you and your allies for |cffffff600|r Health and restoring |cffffff168|r Magicka every |cffffff1|r second when damaging them."',
  icon: "/esoui/art/icons/ability_restorationstaff_005.dds",
  esoSkillId: 241536,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-restoration-staff",
} as const satisfies TemperSkill
