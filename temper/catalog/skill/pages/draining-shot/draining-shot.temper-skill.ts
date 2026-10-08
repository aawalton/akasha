import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const drainingShot = {
  id: "019e6226-00e7-7343-91cf-b4af0658144c",
  type: "page-type/temper-skill",
  slug: "draining-shot",
  title: "Draining Shot",
  key: "draining-shot",
  baseName: "Scatter Shot",
  description:
    "Blast an enemy with an enchanted arrow, dealing 1393 Physical Damage and reducing their Movement Speed by 60% for 3 seconds.\n\nIf the enemy is hit, you heal for 2399.",
  icon: "/esoui/art/icons/ability_bow_004_a.dds",
  esoSkillId: 40883,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 385,
  createdAt: "2026-05-26T02:38:38.311Z",
  updatedAt: "2026-09-27T06:25:43.000Z",
} as const satisfies TemperSkill
