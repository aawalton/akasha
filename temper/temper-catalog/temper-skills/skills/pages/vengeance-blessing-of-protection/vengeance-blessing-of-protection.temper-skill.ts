import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBlessingOfProtection = {
  id: "019e6f53-a8c2-711f-80a4-665743139c87",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-blessing-of-protection",
  title: "Vengeance Blessing of Protection",
  key: "vengeance-blessing-of-protection",
  baseName: "Vengeance Blessing of Protection",
  description:
    '"Slam your staff down to activate its blessings, healing up to 3 of you and your allies in front of you for |cffffff12048|r Health."',
  icon: "/esoui/art/icons/ability_restorationstaff_003.dds",
  esoSkillId: 246616,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-restoration-staff",
} as const satisfies TemperSkill
