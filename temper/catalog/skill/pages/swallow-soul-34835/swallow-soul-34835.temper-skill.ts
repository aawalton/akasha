import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const swallowSoul34835 = {
  id: "019e6f53-a801-7ce2-bf91-7fa989d8f8a8",
  type: "page-type/temper-skill",
  slug: "swallow-soul-34835",
  title: "Swallow Soul",
  key: "swallow-soul-34835",
  baseName: "Strife",
  description:
    "Steal an enemy's life force, dealing |cffffff7509|r Magic Damage and healing you for |cffffff36|r% of the damage inflicted every |cffffff2|r seconds for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_012_a.dds",
  esoSkillId: 34835,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1312,
  createdAt: "2026-05-28T16:03:34.017Z",
  updatedAt: "2026-10-21T15:46:00.523Z",
  equations: [
    "<<1>> = 0.1200306273 MaxStat + 1.260321587 MaxPower (Ultimate, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, 0.5s duration)",
    "<<2>> = 33 (Constant, Heal)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 1% (Constant)",
    "<<6>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
