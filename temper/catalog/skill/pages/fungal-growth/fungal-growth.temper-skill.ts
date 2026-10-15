import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fungalGrowth = {
  id: "019e6f53-a264-7cbc-813e-58612cf713df",
  type: "page-type/temper-skill",
  slug: "fungal-growth",
  title: "Fungal Growth",
  key: "fungal-growth",
  baseName: "Fungal Growth",
  description:
    "Seed a large area of mushrooms in front of you, healing you and your allies for |cffffff8220|r Health.",
  icon: "/esoui/art/icons/ability_warden_008.dds",
  esoSkillId: 85536,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 553,
  createdAt: "2026-05-28T16:03:32.580Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1125 MaxStat + 1.18125 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
