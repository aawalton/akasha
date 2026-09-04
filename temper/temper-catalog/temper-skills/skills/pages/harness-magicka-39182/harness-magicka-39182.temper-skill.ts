import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const harnessMagicka39182 = {
  id: "019e6f53-a2cf-79df-8500-67a7c6a672de",
  pageTypeSlug: "temper-skill",
  slug: "harness-magicka-39182",
  title: "Harness Magicka",
  key: "harness-magicka-39182",
  baseName: "Annulment",
  description:
    '"Convert a portion of your Magicka into a protective ward, gaining a damage shield that absorbs |cffffff5046|r damage for |cffffff6|r seconds. Damage shield strength capped at |cffffff50|r% of your Max Health.\\n\\nWhile active, whenever the shield absorbs damage, you restore |cffffff236|r Magicka. Each piece of Light Armor worn increases the Magicka restored by |cffffff33|r%. This effect can occur up to |cffffff3|r times."',
  icon: "/esoui/art/icons/ability_armor_003_b.dds",
  esoSkillId: 39182,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 2,
  rank: 22,
  skillLineId: "armor-light-armor",
  skillType: "active",
  subcategoryId: "armor-light-armor",
} as const satisfies TemperSkill
