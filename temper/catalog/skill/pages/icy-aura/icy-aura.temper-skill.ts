import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const icyAura = {
  id: "019e6245-a6ab-73b6-bea2-de4f94119656",
  type: "page-type/temper-skill",
  slug: "icy-aura",
  title: "Icy Aura",
  key: "icy-aura",
  baseName: "Icy Aura",
  description:
    "When you take direct damage from an enemy in melee range, you apply a stack of Bite of Winter to them for 3 seconds, up to 5 stacks max. Attackers at max stacks are afflicted with Major Maim for 3 seconds, reducing their damage done by 10%.",
  icon: "/esoui/art/icons/passive_warden_003.dds",
  esoSkillId: 86194,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 654,
  createdAt: "2026-05-26T03:13:12.363Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Bite of Winter (Constant)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = Major Maim (Constant)",
    "<<4>> = 3 seconds (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
