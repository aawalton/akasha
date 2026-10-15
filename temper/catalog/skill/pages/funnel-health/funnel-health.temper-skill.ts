import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const funnelHealth = {
  id: "019e6245-a68e-7c04-a556-3ee8ce0eb435",
  type: "page-type/temper-skill",
  slug: "funnel-health",
  title: "Funnel Health",
  key: "funnel-health",
  baseName: "Strife",
  description:
    "Steal an enemy's life force, dealing 1600 Magic Damage and healing you or 3 other nearby allies for 50% of the damage inflicted every 2 seconds for 10 seconds.",
  icon: "/esoui/art/icons/ability_nightblade_012_b.dds",
  esoSkillId: 35941,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 554,
  createdAt: "2026-05-26T03:13:12.334Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0999264286 MaxStat + 1.0411607 MaxPower - 28.2815773 (Ultimate, ratio = 10.42, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, Melee, 0.5s duration, R2 = 0.991134)",
    "<<2>> = 33 (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 1% (Constant)",
    "<<6>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
