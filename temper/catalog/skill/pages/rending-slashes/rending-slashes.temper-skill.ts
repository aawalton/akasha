import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rendingSlashes = {
  id: "019e6226-010d-723a-850d-924092526e23",
  type: "page-type/temper-skill",
  slug: "rending-slashes",
  title: "Rending Slashes",
  key: "rending-slashes",
  baseName: "Twin Slashes",
  description:
    "Slice an enemy with both weapons to cause deep lacerations, dealing 718 Bleed Damage with each weapon and causing them to bleed for an additional 3470 Bleed Damage over 20 seconds.\n\nEnemies hit by the initial hit are afflicted with the Hemorrhaging status effect.\n\nYou also reduce their Movement Speed by 30% for 4 seconds.",
  icon: "/esoui/art/icons/ability_dualwield_001_a.dds",
  esoSkillId: 40675,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 1023,
  createdAt: "2026-05-26T02:38:38.349Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03201267 MaxStat + 0.336133035 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99952 (Ultimate, ratio = 10.43, Dmg, Bleed, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999995)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 30% (Constant)",
    "<<5>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
