import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ricochetSkull117637 = {
  id: "019e6f53-a654-74dd-9ae9-5545e6341b07",
  type: "page-type/temper-skill",
  slug: "ricochet-skull-117637",
  title: "Ricochet Skull",
  key: "ricochet-skull-117637",
  baseName: "Flame Skull",
  description:
    "Lob an explosive skull at an enemy, dealing |cffffff7509|r Flame Damage.\n\nEvery third cast of this ability deals |cffffff50|r% increased damage, creates a corpse near the initial enemy, and will bounce up to |cffffff2|r times to other nearby enemies.",
  icon: "/esoui/art/icons/ability_necromancer_001_b.dds",
  esoSkillId: 117637,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 1074,
  createdAt: "2026-05-28T16:03:33.588Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.09297 MaxStat + 0.97619 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
