import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const balance = {
  id: "019e6238-c295-752c-9366-c71e75ae39bd",
  pageTypeSlug: "temper-skill",
  slug: "balance",
  title: "Balance",
  key: "balance",
  baseName: "Equilibrium",
  description:
    '"Barter with Oblivion to trade vitality for power, sacrificing your Health in exchange for 3000 Magicka.\\n\\nAfter the exchange is complete, you gain Major Resolve for 30 seconds, increasing your Physical and Spell Resistance by 5948.\\n\\nThe exchange reduces your healing done and damage shield strength by 50% for 4 seconds."',
  icon: "/esoui/art/icons/ability_mageguild_003_b.dds",
  esoSkillId: 42278,
  isMorph: true,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
