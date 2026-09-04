import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSteadfastWard = {
  id: "019e6f53-a991-7c24-9b08-6ea90ee449af",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-steadfast-ward",
  title: "Vengeance Steadfast Ward",
  key: "vengeance-steadfast-ward",
  baseName: "Vengeance Steadfast Ward",
  description:
    "\"Call on your staff's strength to protect you or an ally with a damage shield that absorbs |cffffff12075|r damage for |cffffff6|r seconds.\\n\\nThe shield's strength is increased by up to |cffffff100|r%, depending on the severity of the target's wounds.\"",
  icon: "/esoui/art/icons/ability_restorationstaff_001.dds",
  esoSkillId: 241535,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-restoration-staff",
} as const satisfies TemperSkill
