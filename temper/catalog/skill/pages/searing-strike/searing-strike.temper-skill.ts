import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const searingStrike = {
  id: "019e6f53-a6d0-7ac2-8995-320fb9599374",
  type: "page-type/temper-skill",
  slug: "searing-strike",
  title: "Searing Strike",
  key: "searing-strike",
  baseName: "Searing Strike",
  description:
    "Slash your foe with a fiery claw, dealing |cffffff4036|r Flame Damage and an additional |cffffff11430|r Flame Damage over |cffffff10|r seconds.\n\nThe initial hit always applies the Burning status effect.",
  icon: "/esoui/art/icons/ability_dragonknight_003.dds",
  esoSkillId: 20657,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/dragonknight-ardent-flame",
  skillType: "temper-skill-type/active",
  hashPlace: 1145,
  createdAt: "2026-05-28T16:03:33.712Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05 MaxStat + 0.525 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.029932 MaxStat + 0.315736 MaxPower - 1.70809 (Ultimate, ratio = 10.55, Dmg, Flame, SingleTarget, DOT, 8s duration, 2s tick, R2 = 0.999998)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = Burning (Constant)",
  ],
} as const satisfies TemperSkill
