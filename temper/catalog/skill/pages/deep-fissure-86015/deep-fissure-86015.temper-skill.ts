import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const deepFissure86015 = {
  id: "019e6f53-a0a7-7ab0-9af5-b97144521978",
  type: "page-type/temper-skill",
  slug: "deep-fissure-86015",
  title: "Deep Fissure",
  key: "deep-fissure-86015",
  baseName: "Scorch",
  description:
    "Stir a group of shalk that attack after |cffffff3|r seconds, dealing |cffffff9521|r Magic Damage to enemies in front of you.\n\nAfter the shalk complete their attack, they burrow underground for |cffffff6|r seconds and then resurface again, dealing |cffffff13224|r Magic Damage to enemies in front of you.\n\nEnemies damaged are afflicted with Major and Minor Breach, reducing their Physical and Spell Resistance by |cffffff5948|r and |cffffff2974|r for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_warden_015_a.dds",
  esoSkillId: 86015,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 340,
  createdAt: "2026-05-28T16:03:32.135Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.111564 MaxStat + 1.17142 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<5>> = 5948 (Constant)",
    "<<6>> = 2974 (Constant)",
    "<<7>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
