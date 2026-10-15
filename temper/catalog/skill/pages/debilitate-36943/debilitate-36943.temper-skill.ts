import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const debilitate36943 = {
  id: "019e6f53-a0a2-72c0-aa78-afa07ae21831",
  type: "page-type/temper-skill",
  slug: "debilitate-36943",
  title: "Debilitate",
  key: "debilitate-36943",
  baseName: "Cripple",
  description:
    "Sap an enemy's agility and wrack them with pain, dealing |cffffff15730|r Magic Damage over |cffffff20|r seconds and reducing their Movement Speed by |cffffff50|r% for |cffffff4|r seconds.\n\nThis ability has a higher chance of applying the Overcharged status effect.",
  icon: "/esoui/art/icons/ability_nightblade_006_a.dds",
  esoSkillId: 36943,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 336,
  createdAt: "2026-05-28T16:03:32.130Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197106 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999998)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 50% (Constant)",
    "<<4>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
