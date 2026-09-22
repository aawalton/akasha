import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceTwinSlashes = {
  id: "019e6f53-a9a3-7227-a0eb-8e47270c068c",
  type: "page-type/temper-skill",
  slug: "vengeance-twin-slashes",
  title: "Vengeance Twin Slashes",
  key: "vengeance-twin-slashes",
  baseName: "Vengeance Twin Slashes",
  description:
    '"Slice an enemy with both weapons to cause deep lacerations, dealing |cffffff8348|r Bleed Damage and causing them to bleed for an additional |cffffff7875|r Bleed Damage over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_dualwield_001.dds",
  esoSkillId: 240590,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-dual-wield",
  skillType: "temper-skill-type/active",
  subcategoryId: "vengeance-weapon-dual-wield",
} as const satisfies TemperSkill
