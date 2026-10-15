import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shatteringSpines28308 = {
  id: "019e6f53-a6f2-73ab-97d3-c276c4f8790b",
  type: "page-type/temper-skill",
  slug: "shattering-spines-28308",
  title: "Shattering Spines",
  key: "shattering-spines-28308",
  baseName: "Encase",
  description:
    "Call forth Daedric shards from the earth to encase and immobilize all enemies in front of you for |cffffff4|r seconds. After the effect ends the shards shatter, dealing |cffffff7272|r Magic Damage to any enemy that was encased.\n\nEnemies hit are afflicted with Major Maim, reducing their damage done by |cffffff10|r% for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_twister.dds",
  esoSkillId: 28308,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 1163,
  createdAt: "2026-05-28T16:03:33.746Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 0.0852215 MaxStat + 0.895132 MaxPower - 1.68877 (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = Major Maim (Constant)",
    "<<4>> = 10% (Constant)",
    "<<5>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
