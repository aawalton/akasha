import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const sacrificialBones = {
  id: "019e6f53-a6a4-72cc-bdd4-d2869970b84d",
  type: "page-type/temper-skill",
  slug: "sacrificial-bones",
  title: "Sacrificial Bones",
  key: "sacrificial-bones",
  baseName: "Sacrificial Bones",
  description:
    "Summon a skeleton from the ground after |cffffff2.5|r seconds. The skeleton leaps to you, sacrificing the fallen soul within and enhancing your necromantic energies for |cffffff10|r seconds, increasing your damage done with Necromancer abilities and damage over time effects by |cffffff15|r%.\n\nCreates a corpse on death if you are in combat.",
  icon: "/esoui/art/icons/ability_necromancer_002.dds",
  esoSkillId: 114860,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 1121,
  createdAt: "2026-05-28T16:03:33.668Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2.5 seconds (Constant)",
    "<<2>> = 7 seconds (Constant)",
    "<<3>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
