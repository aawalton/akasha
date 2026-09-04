import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sleetStorm = {
  id: "019e6f53-a73e-75e8-bc02-717936284b4a",
  pageTypeSlug: "temper-skill",
  slug: "sleet-storm",
  title: "Sleet Storm",
  key: "sleet-storm",
  baseName: "Sleet Storm",
  description:
    '"Twist a violent storm around you, dealing |cffffff4036|r Frost Damage every |cffffff1|r second for |cffffff8|r seconds to enemies around you and reducing their Movement Speed by |cffffff40|r%.  \\n\\nYou and nearby allies gain Major Protection, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_warden_006.dds",
  esoSkillId: 86109,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "warden-winters-embrace",
  skillType: "ultimate",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
