import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulAssault40420 = {
  id: "019e6f53-a760-73ff-94e7-2452881fdc10",
  type: "page-type/temper-skill",
  slug: "soul-assault-40420",
  title: "Soul Assault",
  key: "soul-assault-40420",
  baseName: "Soul Strike",
  description:
    "Burn an enemy from the inside with soulfire, dealing |cffffff66904|r Magic Damage over |cffffff6|r seconds.\n\nWhile channeling this ability, you gain immunity to all disabling effects.\n\nEnemies affected by this ability are revealed for |cffffff3|r seconds and may not enter stealth or invisibility.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_otherclass_002_b.dds",
  esoSkillId: 40420,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 6,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1223,
  createdAt: "2026-05-28T16:03:33.856Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.109756 MaxStat + 1.15244 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, DOT, 6s duration, 0.857s tick, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
