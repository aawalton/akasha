import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shatterSoul40414 = {
  id: "019e6f53-a6eb-7757-869d-d97588b7d9e2",
  type: "page-type/temper-skill",
  slug: "shatter-soul-40414",
  title: "Shatter Soul",
  key: "shatter-soul-40414",
  baseName: "Soul Strike",
  description:
    "Burn an enemy from the inside with soulfire, dealing |cffffff48576|r Magic Damage over |cffffff5|r seconds.  Upon completion, the soulfire overflows and explodes from the enemy, dealing |cffffff8814|r Magic Damage to all enemies near them.\n\nWhile channeling this ability, you gain immunity to all disabling effects.\n\nEnemies affected by this ability are revealed for |cffffff3|r seconds and may not enter stealth or invisibility.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_otherclass_002_a.dds",
  esoSkillId: 40414,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1160,
  createdAt: "2026-05-28T16:03:33.739Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.109756 MaxStat + 1.15244 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, DOT, 5s duration, 1s tick, R2 = 1)",
    "<<2>> = 5 seconds (Constant)",
    "<<3>> = 0.10323 MaxStat + 1.08494 MaxPower - 0.77399 (Ultimate, ratio = 10.51, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
