import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceEquilibrium = {
  id: "019e6f53-a901-71cf-9c24-09b5567aea70",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-equilibrium",
  title: "Vengeance Equilibrium",
  key: "vengeance-equilibrium",
  baseName: "Vengeance Equilibrium",
  description:
    '"Barter with Oblivion to trade vitality for power, sacrificing your Health in exchange for |cffffff3000|r Magicka.\\n\\nThe exchange reduces your healing done and damage shield strength by |cffffff50|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_003.dds",
  esoSkillId: 246485,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-mages-guild",
  skillType: "active",
  subcategoryId: "vengeance-guild-mages-guild",
} as const satisfies TemperSkill
