import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const funnelHealth34838 = {
  id: "019e6f53-a26a-7820-b748-04ca542b4bf4",
  type: "page-type/temper-skill",
  slug: "funnel-health-34838",
  title: "Funnel Health",
  key: "funnel-health-34838",
  baseName: "Strife",
  description:
    "Steal an enemy's life force, dealing |cffffff5562|r Magic Damage and healing you or |cffffff3|r other nearby allies for |cffffff51|r% of the damage inflicted every |cffffff2|r seconds for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_012_b.dds",
  esoSkillId: 34838,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 555,
  createdAt: "2026-05-28T16:03:32.586Z",
  updatedAt: "2026-10-21T01:42:11.846Z",
  equations: [
    "<<1>> = 0.0936035 MaxStat + 0.975627 MaxPower - 25.156 (Ultimate, ratio = 10.42, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, 0.5s duration, R2 = 0.991119)",
    "<<7>> = 3 (Constant)",
    "<<2>> = 33 (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 1% (Constant)",
    "<<6>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
