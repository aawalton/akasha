import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const graveLordsSacrifice = {
  id: "019e6245-a694-7c37-ac99-3c17501f7963",
  pageTypeSlug: "temper-skill",
  slug: "grave-lords-sacrifice",
  title: "Grave Lord's Sacrifice",
  key: "grave-lords-sacrifice",
  baseName: "Sacrificial Bones",
  description:
    '"Summon a skeleton from the ground after 2.5 seconds. The skeleton leaps to you, sacrificing the fallen soul within and mastering your necromantic energies for 20 seconds, increasing your damage done with Necromancer abilities and damage over time effects by 15%. While active, your third cast of Flame Skull damages in an 6 meter area.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_002_b.dds",
  esoSkillId: 40117749,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
