import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shatterSoul = {
  id: "019e6251-4ce7-7d6b-8689-aabbdb58d47b",
  type: "page-type/temper-skill",
  slug: "shatter-soul",
  title: "Shatter Soul",
  key: "shatter-soul",
  baseName: "Soul Strike",
  description:
    "Burn an enemy from the inside with soulfire, dealing 14814 Magic Damage over 5 seconds.  Upon completion, the soulfire overflows and explodes from the enemy, dealing 2399 Magic Damage to all enemies near them.\n\nWhile channeling this ability, you gain immunity to all disabling effects.\n\nEnemies affected by this ability are revealed for 3 seconds and may not enter stealth or invisibility.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_otherclass_002_a.dds",
  esoSkillId: 43109,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1159,
  createdAt: "2026-05-26T03:25:55.815Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.109756 MaxStat + 1.15244 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, DOT, 5s duration, 1s tick, R2 = 1)",
    "<<2>> = 5 seconds (Constant)",
    "<<3>> = 0.106622 MaxStat + 1.12092 MaxPower - 1.569 (Ultimate, ratio = 10.51, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
