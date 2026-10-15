import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lifeGiver83850 = {
  id: "019e6f53-a3e6-717e-a5de-350d565f3827",
  type: "page-type/temper-skill",
  slug: "life-giver-83850",
  title: "Life Giver",
  key: "life-giver-83850",
  baseName: "Panacea",
  description:
    "Release the rejuvenating energies of your staff to swirl around you, healing you or an ally for |cffffff9434|r Health every |cffffff1|r second for |cffffff5|r seconds.\n\nWhen you activate this ability you automatically cast Regeneration, Blessing of Protection, and Steadfast Ward at no cost.  These will update based on which morph of each ability you have taken.",
  icon: "/esoui/art/icons/ability_restorationstaff_006_a.dds",
  esoSkillId: 83850,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 50,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 739,
  createdAt: "2026-05-28T16:03:32.966Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12913 MaxStat + 1.35581 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
