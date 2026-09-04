import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bolsteringDarkness = {
  id: "019e6245-a600-7858-b6a0-7a97cd8c8868",
  pageTypeSlug: "temper-skill",
  slug: "bolstering-darkness",
  title: "Bolstering Darkness",
  key: "bolstering-darkness",
  baseName: "Consuming Darkness",
  description:
    '"Conjure a ring of shadow, reducing the Movement Speed of enemies by 70% and granting you and your allies Major Protection for 10 seconds, reducing your damage taken by 10%.\\n\\nAllies in the area can activate the Hidden Refresh synergy, granting them invisibility, increasing their Movement Speed by 70%, and healing them for 9110 Health over 4 seconds."',
  icon: "/esoui/art/icons/ability_nightblade_015_a.dds",
  esoSkillId: 37744,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-shadow",
  skillType: "ultimate",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
