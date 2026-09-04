import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const degeneration = {
  id: "019e6238-c2b2-70ee-abbf-fc1c9553dcd9",
  pageTypeSlug: "temper-skill",
  slug: "degeneration",
  title: "Degeneration",
  key: "degeneration",
  baseName: "Entropy",
  description:
    '"Bind an enemy with chaotic magic, dealing 4642 Magic Damage over 20 seconds.\\n\\nExcess magic spills out from them, granting you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20% for 20 seconds."',
  icon: "/esoui/art/icons/ability_mageguild_004_a.dds",
  esoSkillId: 42224,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
