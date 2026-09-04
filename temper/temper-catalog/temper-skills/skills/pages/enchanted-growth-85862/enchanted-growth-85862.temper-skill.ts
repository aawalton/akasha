import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const enchantedGrowth85862 = {
  id: "019e6f53-a163-7246-b023-eb19c6904263",
  pageTypeSlug: "temper-skill",
  slug: "enchanted-growth-85862",
  title: "Enchanted Growth",
  key: "enchanted-growth-85862",
  baseName: "Fungal Growth",
  description:
    '"Seed a large area of mushrooms in front of you, healing you and your allies for |cffffff8489|r Health. \\n\\nAny target healed gains Minor Intellect and Minor Endurance, increasing their Magicka and Stamina Recovery by |cffffff15|r% for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_warden_008_b.dds",
  esoSkillId: 85862,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
