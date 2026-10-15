import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const chainsOfDominance = {
  id: "019e6245-a617-7ee4-8a1f-e9c455c45600",
  type: "page-type/temper-skill",
  slug: "chains-of-dominance",
  title: "Chains of Dominance",
  key: "chains-of-dominance",
  baseName: "Chains of Flame",
  description:
    "Lash out with a chain bound in Draconic runes, pulling an enemy to you. The enchanted metal deals 5240 Flame Damage, applies the Burning status effect, and taunts them for 15 seconds if they are not already taunted. If the target cannot be pulled, you restore the ability's Magicka cost.\n\nThis attack cannot be dodged or reflected.\n\nAlso inflicts Major Cowardice on the enemy, reducing Weapon and Spell Damage by 430 for 15 seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_005_a.dds",
  esoSkillId: 20496,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 197,
  createdAt: "2026-05-26T03:13:12.215Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = Burning (Constant)",
    "<<3>> = 15 seconds (Constant)",
    "<<4>> = Major Cowardice (Constant)",
    "<<5>> = 430 (Constant)",
    "<<6>> = 12 seconds (Constant)",
  ],
} as const satisfies TemperSkill
