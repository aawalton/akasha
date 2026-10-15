import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const chainsOfFlame = {
  id: "019e6f53-9fce-790b-8622-26e622693e55",
  type: "page-type/temper-skill",
  slug: "chains-of-flame",
  title: "Chains of Flame",
  key: "chains-of-flame",
  baseName: "Chains of Flame",
  description:
    "Lash out with a flaming chain, pulling an enemy to you. The searing metal deals |cffffff4846|r Flame Damage, applies the Burning status effect, and taunts them for |cffffff15|r seconds if they are not already taunted.\n\nThis attack cannot be dodged or reflected.\n\nAlso inflicts Major Cowardice on the enemy, reducing Weapon and Spell Damage by |cffffff430|r for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_005.dds",
  esoSkillId: 20492,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 198,
  createdAt: "2026-05-28T16:03:31.918Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06 MaxStat + 0.63 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = Burning (Constant)",
    "<<3>> = 15 seconds (Constant)",
    "<<4>> = Major Cowardice (Constant)",
    "<<5>> = 430 (Constant)",
    "<<6>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
