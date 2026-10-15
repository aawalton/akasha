import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lethalArrow = {
  id: "019e6226-00fd-75a0-afb3-e304b7048a8b",
  type: "page-type/temper-skill",
  slug: "lethal-arrow",
  title: "Lethal Arrow",
  key: "lethal-arrow",
  baseName: "Snipe",
  description:
    "Plant a masterfully aimed arrow in an enemy's vital spot, dealing 2483 Poison Damage and applying the Poisoned status effect.\n\nAlso afflicts enemy with Minor Defile, which reduces their healing received and damage shield strength by 6% for 4 seconds.",
  icon: "/esoui/art/icons/ability_bow_001_a.dds",
  esoSkillId: 40897,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 735,
  createdAt: "2026-05-26T02:38:38.333Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.110443195 MaxStat + 1.15965613 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Poison, SingleTarget, Direct, 0.8s cooldown, R2 = 1)",
    "<<2>> = Minor Defile (Constant)",
    "<<3>> = 6% (Constant)",
    "<<4>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
