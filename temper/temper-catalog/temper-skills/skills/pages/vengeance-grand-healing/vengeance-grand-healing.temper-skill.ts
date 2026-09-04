import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceGrandHealing = {
  id: "019e6f53-a91c-7261-87d3-9aa3b92ab047",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-grand-healing",
  title: "Vengeance Grand Healing",
  key: "vengeance-grand-healing",
  baseName: "Vengeance Grand Healing",
  description:
    '"Summon restoring spirits with your staff at the target location, healing up to 3 of you and your allies for |cffffff24096|r Health over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_004.dds",
  esoSkillId: 241517,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-restoration-staff",
} as const satisfies TemperSkill
