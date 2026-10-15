import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const naturesEmbrace = {
  id: "019e6245-a6d7-701e-ac52-e1c880eb6320",
  type: "page-type/temper-skill",
  slug: "natures-embrace",
  title: "Nature's Embrace",
  key: "natures-embrace",
  baseName: "Nature's Grasp",
  description:
    "Launch a vine to swing yourself to an ally, healing you and them for 3594 Health over 10 seconds. Gain 3 Ultimate when either of these effects complete while you are in combat.",
  icon: "/esoui/art/icons/ability_warden_011_b.dds",
  esoSkillId: 93940,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 850,
  createdAt: "2026-05-26T03:13:12.407Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0266813 MaxStat + 0.280253 MaxPower - 1.82772 (Ultimate, ratio = 10.50, Heal, SingleTarget, DOT, 10s duration, 2s tick, R2 = 0.999996)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 3 (Constant)",
  ],
} as const satisfies TemperSkill
