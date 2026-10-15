import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulShred = {
  id: "019e6f53-a76b-7d73-9989-2b896c684347",
  type: "page-type/temper-skill",
  slug: "soul-shred",
  title: "Soul Shred",
  key: "soul-shred",
  baseName: "Soul Shred",
  description:
    "Ravage nearby enemies' souls with a night rune, dealing |cffffff12802|r Magic Damage and stunning them for |cffffff4|r seconds. \n\nAn ally can target a ravaged enemy and activate the Soul Leech synergy, dealing |cffffff10851|r Magic Damage to them and healing for the damage caused.",
  icon: "/esoui/art/icons/ability_nightblade_018.dds",
  esoSkillId: 25091,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1229,
  createdAt: "2026-05-28T16:03:33.867Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15 MaxStat + 1.575 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, 0.5s cooldown, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = Soul Leech (Constant)",
    "<<4>> = 0.1388 MaxStat + 1.4571 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
