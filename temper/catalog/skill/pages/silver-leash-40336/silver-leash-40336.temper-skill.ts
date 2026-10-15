import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const silverLeash40336 = {
  id: "019e6f53-a71d-72a8-bb22-53d4e3239c87",
  type: "page-type/temper-skill",
  slug: "silver-leash-40336",
  title: "Silver Leash",
  key: "silver-leash-40336",
  baseName: "Silver Bolts",
  description:
    "Fire a Dawnguard's crossbow hook to pull an enemy to you, dealing |cffffff5004|r Physical Damage, taunting them for |cffffff15|r seconds if they are not already taunted, and reducing their Movement Speed by |cffffff30|r% for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_003_b.dds",
  esoSkillId: 40336,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1188,
  createdAt: "2026-05-28T16:03:33.789Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = 30% (Constant)",
    "<<4>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
