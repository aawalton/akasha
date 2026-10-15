import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const icyAura86193 = {
  id: "019e6f53-a345-7f89-8ae4-737e2b29d746",
  type: "page-type/temper-skill",
  slug: "icy-aura-86193",
  title: "Icy Aura",
  key: "icy-aura-86193",
  baseName: "Icy Aura",
  description:
    "When you take direct damage from an enemy in melee range, you apply a stack of Bite of Winter to them for |cffffff1.5|r seconds, up to |cffffff5|r stacks max. Attackers at max stacks are afflicted with Major Maim for |cffffff1.5|r seconds, reducing their damage done by |cffffff10|r%.",
  icon: "/esoui/art/icons/passive_warden_003.dds",
  esoSkillId: 86193,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/passive",
  hashPlace: 655,
  createdAt: "2026-05-28T16:03:32.805Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Bite of Winter (Constant)",
    "<<2>> = 1.5 seconds (Constant)",
    "<<3>> = Major Maim (Constant)",
    "<<4>> = 1.5 seconds (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
