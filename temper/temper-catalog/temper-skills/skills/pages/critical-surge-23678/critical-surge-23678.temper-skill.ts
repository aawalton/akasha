import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const criticalSurge23678 = {
  id: "019e6f53-a03d-750f-a516-2ab238e25a2b",
  pageTypeSlug: "temper-skill",
  slug: "critical-surge-23678",
  title: "Critical Surge",
  key: "critical-surge-23678",
  baseName: "Surge",
  description:
    '"Invoke Meridia\'s name to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff33|r seconds.\\n\\nWhile active, dealing Critical Damage heals you for |cffffff3366|r Health. This effect can occur once every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_sorcerer_critical_surge.dds",
  esoSkillId: 23678,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
