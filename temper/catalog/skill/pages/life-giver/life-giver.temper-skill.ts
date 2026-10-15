import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lifeGiver = {
  id: "019e6226-00fe-72c0-9154-50e842b5355e",
  type: "page-type/temper-skill",
  slug: "life-giver",
  title: "Life Giver",
  key: "life-giver",
  baseName: "Panacea",
  description:
    "Release the rejuvenating energies of your staff to swirl around you, healing you or an ally for 2999 Health every 1 second for 5 seconds.\n\nWhen you activate this ability you automatically cast Regeneration, Blessing of Protection, and Steadfast Ward at no cost.  These will update based on which morph of each ability you have taken.",
  icon: "/esoui/art/icons/ability_restorationstaff_006_a.dds",
  esoSkillId: 86454,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 738,
  createdAt: "2026-05-26T02:38:38.334Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.13339129 MaxStat + 1.40055173 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
