import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sturdyHorn40220 = {
  id: "019e6f53-a7d3-7cfb-9497-0084a71a9dc9",
  pageTypeSlug: "temper-skill",
  slug: "sturdy-horn-40220",
  title: "Sturdy Horn",
  key: "sturdy-horn-40220",
  baseName: "War Horn",
  description:
    '"Sound a war horn to rally your forces, increasing you and your group\'s Max Magicka and Max Stamina by |cffffff10|r% for |cffffff30|r seconds.\\n\\nYou and your allies gain |cffffff1320|r Critical Resistance for |cffffff10|r seconds, reducing incoming Critical Damage by |cffffff20|r%."',
  icon: "/esoui/art/icons/ability_ava_003_b.dds",
  esoSkillId: 40220,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "alliance-war-assault",
  skillType: "ultimate",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
