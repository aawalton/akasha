import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const enchantedGrowth85862 = {
  id: "019e6f53-a163-7246-b023-eb19c6904263",
  type: "page-type/temper-skill",
  slug: "enchanted-growth-85862",
  title: "Enchanted Growth",
  key: "enchanted-growth-85862",
  baseName: "Fungal Growth",
  description:
    "Seed a large area of mushrooms in front of you, healing you and your allies for |cffffff8489|r Health. \n\nAny target healed gains Minor Intellect and Minor Endurance, increasing their Magicka and Stamina Recovery by |cffffff15|r% for |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_warden_008_b.dds",
  esoSkillId: 85862,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 429,
  createdAt: "2026-05-28T16:03:32.323Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.116213 MaxStat + 1.22023 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 15% (Constant)",
    "<<3>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
