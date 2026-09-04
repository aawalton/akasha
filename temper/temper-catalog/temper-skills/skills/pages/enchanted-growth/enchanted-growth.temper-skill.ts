import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const enchantedGrowth = {
  id: "019e6245-a666-73fd-b18d-ff5a9d3618d9",
  pageTypeSlug: "temper-skill",
  slug: "enchanted-growth",
  title: "Enchanted Growth",
  key: "enchanted-growth",
  baseName: "Fungal Growth",
  description:
    '"Seed a large area of mushrooms in front of you, healing you and your allies for 2700 Health. \\n\\nAny target healed gains Minor Intellect and Minor Endurance, increasing their Magicka and Stamina Recovery by 15% for 20 seconds."',
  icon: "/esoui/art/icons/ability_warden_008_b.dds",
  esoSkillId: 93774,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
