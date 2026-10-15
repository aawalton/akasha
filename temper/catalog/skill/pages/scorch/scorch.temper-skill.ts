import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const scorch = {
  id: "019e6f53-a6c3-776d-b0d2-da0d793f5575",
  type: "page-type/temper-skill",
  slug: "scorch",
  title: "Scorch",
  key: "scorch",
  baseName: "Scorch",
  description:
    "Stir a group of shalk that attack after |cffffff3|r seconds, dealing |cffffff9215|r Magic Damage to enemies in front of you.\n\nAfter the shalk complete their attack, they burrow underground for |cffffff6|r seconds and then resurface again, dealing |cffffff12802|r Magic Damage to enemies in front of you.",
  icon: "/esoui/art/icons/ability_warden_015.dds",
  esoSkillId: 86009,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 1138,
  createdAt: "2026-05-28T16:03:33.699Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.108 MaxStat + 1.134 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 0.15 MaxStat + 1.575 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
