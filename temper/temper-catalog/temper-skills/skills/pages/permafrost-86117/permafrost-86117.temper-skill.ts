import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const permafrost86117 = {
  id: "019e6f53-a4ed-774d-b215-31c9167e6e71",
  pageTypeSlug: "temper-skill",
  slug: "permafrost-86117",
  title: "Permafrost",
  key: "permafrost-86117",
  baseName: "Sleet Storm",
  description:
    '"Twist a violent storm around you, dealing |cffffff551|r Frost Damage every |cffffff1|r second for |cffffff13|r seconds to enemies around you and reducing their Movement Speed by |cffffff70|r% and applying the Chilled status effect.\\n\\nYou and nearby allies gain Major Protection, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_warden_006_b.dds",
  esoSkillId: 86117,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-winters-embrace",
  skillType: "ultimate",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
