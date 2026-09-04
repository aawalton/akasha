import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const icyAura86193 = {
  id: "019e6f53-a345-7f89-8ae4-737e2b29d746",
  pageTypeSlug: "temper-skill",
  slug: "icy-aura-86193",
  title: "Icy Aura",
  key: "icy-aura-86193",
  baseName: "Icy Aura",
  description:
    '"When you take direct damage from an enemy in melee range, you apply a stack of Bite of Winter to them for |cffffff1.5|r seconds, up to |cffffff5|r stacks max. Attackers at max stacks are afflicted with Major Maim for |cffffff1.5|r seconds, reducing their damage done by |cffffff10|r%."',
  icon: "/esoui/art/icons/passive_warden_003.dds",
  esoSkillId: 86193,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "warden-winters-embrace",
  skillType: "passive",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
