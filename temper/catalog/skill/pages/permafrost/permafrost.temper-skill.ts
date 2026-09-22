import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const permafrost = {
  id: "019e6245-a6df-7abd-805b-2fca8e513855",
  type: "page-type/temper-skill",
  slug: "permafrost",
  title: "Permafrost",
  key: "permafrost",
  baseName: "Sleet Storm",
  description:
    '"Twist a violent storm around you, dealing 158 Frost Damage every 1 second for 13 seconds to enemies around you and reducing their Movement Speed by 70% and applying the Chilled status effect.\\n\\nYou and nearby allies gain Major Protection, reducing your damage taken by 10%."',
  icon: "/esoui/art/icons/ability_warden_006_b.dds",
  esoSkillId: 86120,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-winters-embrace",
  skillType: "temper-skill-type/ultimate",
} as const satisfies TemperSkill
