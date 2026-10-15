import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const debilitate = {
  id: "019e6245-a646-7e99-8b91-8490561cd1eb",
  type: "page-type/temper-skill",
  slug: "debilitate",
  title: "Debilitate",
  key: "debilitate",
  baseName: "Cripple",
  description:
    "Sap an enemy's agility and wrack them with pain, dealing 4785 Magic Damage over 20 seconds and reducing their Movement Speed by 50% for 4 seconds.\n\nThis ability has a higher chance of applying the Overcharged status effect.",
  icon: "/esoui/art/icons/ability_nightblade_006_a.dds",
  esoSkillId: 37887,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 335,
  createdAt: "2026-05-26T03:13:12.262Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0193549 MaxStat + 0.203761 MaxPower - 1.01347 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999997)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 50% (Constant)",
    "<<4>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
