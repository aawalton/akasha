import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lifeGiver = {
  id: "019e6226-00fe-72c0-9154-50e842b5355e",
  pageTypeSlug: "temper-skill",
  slug: "life-giver",
  title: "Life Giver",
  key: "life-giver",
  baseName: "Panacea",
  description:
    '"Release the rejuvenating energies of your staff to swirl around you, healing you or an ally for 2999 Health every 1 second for 5 seconds.\\n\\nWhen you activate this ability you automatically cast Regeneration, Blessing of Protection, and Steadfast Ward at no cost.  These will update based on which morph of each ability you have taken."',
  icon: "/esoui/art/icons/ability_restorationstaff_006_a.dds",
  esoSkillId: 86454,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-restoration-staff",
  skillType: "ultimate",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
