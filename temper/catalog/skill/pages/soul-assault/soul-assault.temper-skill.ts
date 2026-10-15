import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulAssault = {
  id: "019e6251-4ceb-7a1a-8624-f8f97cb11f25",
  type: "page-type/temper-skill",
  slug: "soul-assault",
  title: "Soul Assault",
  key: "soul-assault",
  baseName: "Soul Strike",
  description:
    "Burn an enemy from the inside with soulfire, dealing 20400 Magic Damage over 6 seconds.\n\nWhile channeling this ability, you gain immunity to all disabling effects.\n\nEnemies affected by this ability are revealed for 3 seconds and may not enter stealth or invisibility.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_otherclass_002_b.dds",
  esoSkillId: 43099,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1222,
  createdAt: "2026-05-26T03:25:55.819Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.113377948 MaxStat + 1.19047052 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, SingleTarget, DOT, 6s duration, 0.857s tick, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
