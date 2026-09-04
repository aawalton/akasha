import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spellSymmetry = {
  id: "019e6238-c317-7a9c-be6e-670d7bc768cc",
  pageTypeSlug: "temper-skill",
  slug: "spell-symmetry",
  title: "Spell Symmetry",
  key: "spell-symmetry",
  baseName: "Equilibrium",
  description:
    '"Barter with Oblivion to trade vitality for power, sacrificing your Health in exchange for 3000 Magicka.\\n\\nAfter the exchange is complete, the cost of your next Magicka ability is reduced by 33% for 5 seconds.\\n\\nThe exchange reduces your healing done and damage shield strength by 50% for 4 seconds."',
  icon: "/esoui/art/icons/ability_mageguild_003_a.dds",
  esoSkillId: 42263,
  isMorph: true,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
