import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const enchantedForest85804 = {
  id: "019e6f53-a15c-7bdb-9dc6-82a89923c277",
  pageTypeSlug: "temper-skill",
  slug: "enchanted-forest-85804",
  title: "Enchanted Forest",
  key: "enchanted-forest-85804",
  baseName: "Secluded Grove",
  description:
    '"Swell a healing forest at the target location, instantly healing the most injured friendly target for |cffffff9057|r Health. The forest continues to heal you and your allies in the area for |cffffff3017|r Health every |cffffff1|r second for |cffffff6|r seconds.\\n\\nYou generate |cffffff20|r Ultimate if the initial heal is used on a friendly target under |cffffff50|r% Health."',
  icon: "/esoui/art/icons/ability_warden_012_a.dds",
  esoSkillId: 85804,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "warden-green-balance",
  skillType: "ultimate",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
