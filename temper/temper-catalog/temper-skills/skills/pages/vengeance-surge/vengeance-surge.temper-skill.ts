import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSurge = {
  id: "019e6f53-a99a-76a1-bca6-e6294fcd5852",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-surge",
  title: "Vengeance Surge",
  key: "vengeance-surge",
  baseName: "Vengeance Surge",
  description:
    '"Invoke Meridia\'s name to heal yourself for |cffffff16065|r Health.\\n\\nWhile slotted you gain Minor Berserk, increasing your damage done by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_surge.dds",
  esoSkillId: 237971,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-storm-calling",
} as const satisfies TemperSkill
