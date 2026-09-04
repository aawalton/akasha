import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lifeGiver83850 = {
  id: "019e6f53-a3e6-717e-a5de-350d565f3827",
  pageTypeSlug: "temper-skill",
  slug: "life-giver-83850",
  title: "Life Giver",
  key: "life-giver-83850",
  baseName: "Panacea",
  description:
    '"Release the rejuvenating energies of your staff to swirl around you, healing you or an ally for |cffffff9434|r Health every |cffffff1|r second for |cffffff5|r seconds.\\n\\nWhen you activate this ability you automatically cast Regeneration, Blessing of Protection, and Steadfast Ward at no cost.  These will update based on which morph of each ability you have taken."',
  icon: "/esoui/art/icons/ability_restorationstaff_006_a.dds",
  esoSkillId: 83850,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 50,
  skillLineId: "weapon-restoration-staff",
  skillType: "ultimate",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
