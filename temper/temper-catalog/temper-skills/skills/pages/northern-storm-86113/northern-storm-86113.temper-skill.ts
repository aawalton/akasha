import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const northernStorm86113 = {
  id: "019e6f53-a4c4-7486-9bbf-9cce5c7548cb",
  pageTypeSlug: "temper-skill",
  slug: "northern-storm-86113",
  title: "Northern Storm",
  key: "northern-storm-86113",
  baseName: "Sleet Storm",
  description:
    '"Twist a violent storm around you, dealing |cffffff4170|r Frost Damage every |cffffff1|r second for |cffffff8|r seconds to enemies around you and reducing their Movement Speed by |cffffff40|r%. As the storm holds, your damage done increases by |cffffff2|r% every |cffffff1|r second for |cffffff12|r seconds, up to |cffffff9|r stacks max.\\n\\nYou and nearby allies gain Major Protection, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_warden_006_a.dds",
  esoSkillId: 86113,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "warden-winters-embrace",
  skillType: "ultimate",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
