import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bitingJabs26792 = {
  id: "019e6f53-9f13-7984-8526-a4660ba40074",
  pageTypeSlug: "temper-skill",
  slug: "biting-jabs-26792",
  title: "Biting Jabs",
  key: "biting-jabs-26792",
  baseName: "Puncturing Strikes",
  description:
    '"Launch a relentless assault, striking up to 6 enemies in front of you three times with your Aedric spear. The spear deals |cffffff3378|r Physical Damage per strike and reduces enemy Movement Speed by |cffffff40|r% for |cffffff0.5|r seconds. Each strike has a 10% chance of applying the Sundered status effect.\\n\\nActivating this ability grants you Major Brutality and Major Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_templar_recovery.dds",
  esoSkillId: 26792,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
