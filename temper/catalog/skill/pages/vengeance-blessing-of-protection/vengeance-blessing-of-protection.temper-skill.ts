import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceBlessingOfProtection = {
  id: "019e6f53-a8c2-711f-80a4-665743139c87",
  type: "page-type/temper-skill",
  slug: "vengeance-blessing-of-protection",
  title: "Vengeance Blessing of Protection",
  key: "vengeance-blessing-of-protection",
  baseName: "Vengeance Blessing of Protection",
  description:
    "Slam your staff down to activate its blessings, healing up to 3 of you and your allies in front of you for |cffffff12048|r Health.",
  icon: "/esoui/art/icons/ability_restorationstaff_003.dds",
  esoSkillId: 246616,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1422,
  createdAt: "2026-05-28T16:03:34.210Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 6 (Constant)", "<<2>> = 11812 (Constant)"],
} as const satisfies TemperSkill
