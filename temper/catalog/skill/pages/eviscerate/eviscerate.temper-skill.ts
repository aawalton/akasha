import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const eviscerate = {
  id: "019e6f53-a1af-7fe0-8249-d6d25d09bf3b",
  type: "page-type/temper-skill",
  slug: "eviscerate",
  title: "Eviscerate",
  key: "eviscerate",
  baseName: "Eviscerate",
  description:
    "Rend an enemy, dealing |cffffff8076|r Magic Damage and applying the Hemorrhaging status effect.\n\nDeals up to |cffffff33|r% more damage based on your missing Health.",
  icon: "/esoui/art/icons/ability_u26_vampire_01.dds",
  esoSkillId: 32893,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 465,
  createdAt: "2026-05-28T16:03:32.399Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Hemorrhaging (Constant)",
    "<<3>> = 33 (Constant)",
  ],
} as const satisfies TemperSkill
