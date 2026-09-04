import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sacrificialBones = {
  id: "019e6f53-a6a4-72cc-bdd4-d2869970b84d",
  pageTypeSlug: "temper-skill",
  slug: "sacrificial-bones",
  title: "Sacrificial Bones",
  key: "sacrificial-bones",
  baseName: "Sacrificial Bones",
  description:
    '"Summon a skeleton from the ground after |cffffff2.5|r seconds. The skeleton leaps to you, sacrificing the fallen soul within and enhancing your necromantic energies for |cffffff10|r seconds, increasing your damage done with Necromancer abilities and damage over time effects by |cffffff15|r%.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_002.dds",
  esoSkillId: 114860,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
