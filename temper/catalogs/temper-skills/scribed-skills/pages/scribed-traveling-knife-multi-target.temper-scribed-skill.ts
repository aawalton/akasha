import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTravelingKnifeMultiTarget = {
  id: "019e6471-15df-7596-9c06-02ab44ba7578",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-traveling-knife-multi-target",
  title: "Shattering Knife",
  key: "scribed-traveling-knife-multi-target",
  baseName: "Traveling Knife",
  description:
    "Deals 928 Physical Damage to an enemy and 1393 Physical Damage to enemies around them.",
  icon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
  esoSkillId: 217872,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "multi-target",
  grimoireId: "traveling-knife",
} as const satisfies TemperScribedSkill
