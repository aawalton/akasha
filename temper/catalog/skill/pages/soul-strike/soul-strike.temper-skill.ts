import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulStrike = {
  id: "019e6f53-a777-7788-adc2-7eef0375bf6e",
  type: "page-type/temper-skill",
  slug: "soul-strike",
  title: "Soul Strike",
  key: "soul-strike",
  baseName: "Soul Strike",
  description:
    "Burn an enemy from the inside with soulfire, dealing |cffffff48576|r Magic Damage over |cffffff5|r seconds.\n\nWhile channeling this ability, you gain immunity to all disabling effects.\n\nEnemies affected by this ability are revealed for |cffffff3|r seconds and may not enter stealth or invisibility.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_otherclass_002.dds",
  esoSkillId: 39270,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1236,
  createdAt: "2026-05-28T16:03:33.879Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.10625 MaxStat + 1.11563 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, DOT, 5s duration, 1s tick, R2 = 1)",
    "<<2>> = 5 seconds (Constant)",
    "<<3>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
