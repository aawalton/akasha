import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fireRune = {
  id: "019e6f53-a200-7050-8802-7e01537493c4",
  type: "page-type/temper-skill",
  slug: "fire-rune",
  title: "Fire Rune",
  key: "fire-rune",
  baseName: "Fire Rune",
  description:
    "Inscribe a rune of cosmic fire on the earth, which takes |cffffff2|r seconds to arm and lasts for |cffffff20|r seconds.\n\nWhen triggered, the rune blasts all enemies in the target area for |cffffff8533|r Flame Damage.",
  icon: "/esoui/art/icons/ability_mageguild_001.dds",
  esoSkillId: 31632,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 513,
  createdAt: "2026-05-28T16:03:32.480Z",
  updatedAt: "2026-10-21T02:29:23.868Z",
  equations: [
    "<<3>> = 2 seconds (Constant)",
    "<<1>> = 20 seconds (Constant, +2 seconds with everlasting-magic)",
    "<<2>> = 0.0999631 MaxStat + 1.0499 MaxPower - 0.231961 (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
