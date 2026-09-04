import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spitewardOfTheLucidMind = {
  id: "019e6245-a740-746c-9b6a-d53809139d24",
  pageTypeSlug: "temper-skill",
  slug: "spiteward-of-the-lucid-mind",
  title: "Spiteward of the Lucid Mind",
  key: "spiteward-of-the-lucid-mind",
  baseName: "Runespite Ward",
  description:
    '"Like the rune knights of old, summon a shield that absorbs 4800 damage for 6 seconds, scaling off your Max Health.\\n\\nThe first time you take direct damage, the shield retaliates and deals 0 Magic Damage to the attacker, scaling off your Armor.\\n\\nConsume Crux to heal yourself 1600 Health, scaling off your Max Health, and refund 30% of Spiteward of the Lucid Mind cost per Crux spent."',
  icon: "/esoui/art/icons/ability_arcanist_008_a.dds",
  esoSkillId: 40185901,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
