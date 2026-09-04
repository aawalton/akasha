import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceOverload = {
  id: "019e6f53-a94b-77aa-bd39-7b91ee31e94e",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-overload",
  title: "Vengeance Overload",
  key: "vengeance-overload",
  baseName: "Vengeance Overload",
  description:
    '"Charge your fists with the power of the storm and deal |cffffff12521|r Shock Damage to your enemy.\\n\\nThis ability does not drain all available Ultimate."',
  icon: "/esoui/art/icons/ability_sorcerer_overload.dds",
  esoSkillId: 237998,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-storm-calling",
  skillType: "ultimate",
  subcategoryId: "vengeance-sorcerer-storm-calling",
} as const satisfies TemperSkill
