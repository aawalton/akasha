import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const aggressiveHorn40223 = {
  id: "019e6f53-9e9f-7d89-bc10-288ae2fdf47d",
  pageTypeSlug: "temper-skill",
  slug: "aggressive-horn-40223",
  title: "Aggressive Horn",
  key: "aggressive-horn-40223",
  baseName: "War Horn",
  description:
    '"Sound a war horn to rally your forces, increasing you and your group\'s Max Magicka and Max Stamina by |cffffff10|r% for |cffffff30|r seconds.\\n\\nYou and your allies gain Major Force, increasing your Critical Damage by |cffffff20|r% for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_ava_003_a.dds",
  esoSkillId: 40223,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "alliance-war-assault",
  skillType: "ultimate",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
