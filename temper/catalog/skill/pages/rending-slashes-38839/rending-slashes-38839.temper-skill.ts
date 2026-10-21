import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rendingSlashes38839 = {
  id: "019e6f53-a5f9-7c19-8f1f-e258cc05c0b0",
  type: "page-type/temper-skill",
  slug: "rending-slashes-38839",
  title: "Rending Slashes",
  key: "rending-slashes-38839",
  baseName: "Twin Slashes",
  description:
    "Slice an enemy with both weapons to cause deep lacerations, dealing |cffffff2502|r Bleed Damage with each weapon and causing them to bleed for an additional |cffffff11420|r Bleed Damage over |cffffff20|r seconds.\n\nEnemies hit by the initial hit are afflicted with the Hemorrhaging status effect.\n\nYou also reduce their Movement Speed by |cffffff30|r% for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_dualwield_001_a.dds",
  esoSkillId: 38839,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 1024,
  createdAt: "2026-05-28T16:03:33.497Z",
  updatedAt: "2026-10-21T03:53:31.433Z",
  equations: [
    "<<1>> = 0.032035703 MaxStat + 0.33637488 MaxPower (Ultimate, RankMod(1), Dmg, Bleed, SingleTarget, Direct, Melee)",
    "<<2>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99952 (Ultimate, ratio = 10.43, Dmg, Bleed, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999995)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 30% (Constant)",
    "<<5>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
