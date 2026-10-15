import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const natureSEmbrace = {
  id: "019e6f53-a4ac-7de0-b0b0-62f5f33d3947",
  type: "page-type/temper-skill",
  slug: "nature-s-embrace",
  title: "Nature's Embrace",
  key: "nature-s-embrace",
  baseName: "Nature's Grasp",
  description:
    "Launch a vine to swing yourself to an ally, healing you and them for |cffffff11316|r Health over |cffffff10|r seconds. Gain |cffffff3|r Ultimate when either of these effects complete while you are in combat.",
  icon: "/esoui/art/icons/ability_warden_011_b.dds",
  esoSkillId: 85858,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 847,
  createdAt: "2026-05-28T16:03:33.164Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.025813 MaxStat + 0.271375 MaxPower - 1.25987 (Ultimate, ratio = 10.51, Heal, SingleTarget, DOT, 10s duration, 2s tick, R2 = 0.999998)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 3 (Constant)",
  ],
} as const satisfies TemperSkill
