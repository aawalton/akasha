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
  updatedAt: "2026-10-21T15:46:00.523Z",
  equations: [
    "<<1>> = 0.096026965 MaxStat + 1.0082831 MaxPower (Ultimate, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, 0.5s duration)",
    "<<7>> = 3 (Constant)",
    "<<2>> = 33 (Constant, Heal)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 1% (Constant)",
    "<<6>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
