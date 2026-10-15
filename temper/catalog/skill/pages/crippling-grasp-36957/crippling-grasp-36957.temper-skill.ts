import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cripplingGrasp36957 = {
  id: "019e6f53-a034-74de-8561-80705d6a92d8",
  type: "page-type/temper-skill",
  slug: "crippling-grasp-36957",
  title: "Crippling Grasp",
  key: "crippling-grasp-36957",
  baseName: "Cripple",
  description:
    "Sap an enemy's agility and wrack them with pain, dealing |cffffff4170|r Magic Damage and an additional |cffffff14300|r Magic Damage over |cffffff20|r seconds, immobilizing them for |cffffff2|r seconds, and reducing their Movement Speed by |cffffff30|r% for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_006_b.dds",
  esoSkillId: 36957,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 261,
  createdAt: "2026-05-28T16:03:32.020Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.051612 MaxStat + 0.542543 MaxPower - 0.879855 (Ultimate, ratio = 10.51, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.018722 MaxStat + 0.197107 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999998)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 2 seconds (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
