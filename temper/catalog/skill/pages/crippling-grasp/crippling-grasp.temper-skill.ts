import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cripplingGrasp = {
  id: "019e6245-a625-75ae-bf5d-6e0e6e398676",
  type: "page-type/temper-skill",
  slug: "crippling-grasp",
  title: "Crippling Grasp",
  key: "crippling-grasp",
  baseName: "Cripple",
  description:
    "Sap an enemy's agility and wrack them with pain, dealing 1199 Magic Damage and an additional 4350 Magic Damage over 20 seconds, immobilizing them for 2 seconds, and reducing their Movement Speed by 30% for 4 seconds.",
  icon: "/esoui/art/icons/ability_nightblade_006_b.dds",
  esoSkillId: 37913,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 260,
  createdAt: "2026-05-26T03:13:12.229Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0533085 MaxStat + 0.56047 MaxPower - 1.35721 (Ultimate, ratio = 10.51, Dmg, Magic, SingleTarget, Direct, R2 = 0.999999)",
    "<<2>> = 0.0193549 MaxStat + 0.203761 MaxPower - 1.01347 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999997)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 2 seconds (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
