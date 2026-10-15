import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const twinSlashes = {
  id: "019e6f53-a86e-735a-b01a-4ca9419ea210",
  type: "page-type/temper-skill",
  slug: "twin-slashes",
  title: "Twin Slashes",
  key: "twin-slashes",
  baseName: "Twin Slashes",
  description:
    "Slice an enemy with both weapons to cause deep lacerations, dealing |cffffff2017|r Bleed Damage with each weapon and causing them to bleed for an additional |cffffff11420|r Bleed Damage over |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_dualwield_001.dds",
  esoSkillId: 28379,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 1373,
  createdAt: "2026-05-28T16:03:34.126Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.025 MaxStat + 0.2625 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0150563 MaxStat + 0.157611 MaxPower - 2.12747 (Ultimate, ratio = 10.47, Dmg, Bleed, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999993)",
    "<<3>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
