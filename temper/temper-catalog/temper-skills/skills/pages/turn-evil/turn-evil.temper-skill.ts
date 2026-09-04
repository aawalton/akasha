import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const turnEvil = {
  id: "019e6238-c327-799c-ba29-cfb6fc5be8fd",
  pageTypeSlug: "temper-skill",
  slug: "turn-evil",
  title: "Turn Evil",
  key: "turn-evil",
  baseName: "Circle of Protection",
  description:
    '"Brand the earth at your location with a rune of protection for 20 seconds. You and your allies in the area gain Minor Protection and Minor Endurance, reducing your damage taken by 5% and increasing your Stamina Recovery by 15%.\\n\\nUpon activation, enemies in the area are feared for 4 seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_001_a.dds",
  esoSkillId: 42529,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
