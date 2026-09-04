import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bitingJabs = {
  id: "019e6245-a5f8-727f-bda8-7293c7ddbed0",
  pageTypeSlug: "temper-skill",
  slug: "biting-jabs",
  title: "Biting Jabs",
  key: "biting-jabs",
  baseName: "Puncturing Strikes",
  description:
    '"Launch a relentless assault, striking up to 6 enemies in front of you three times with your Aedric spear. The spear deals 919 Physical Damage per strike and reduces enemy Movement Speed by 40% for 0.5 seconds. Each strike has a 10% chance of applying the Sundered status effect.\\n\\nActivating this ability grants you Major Brutality and Major Sorcery, increasing your Weapon and Spell Damage by 20% for 10 seconds."',
  icon: "/esoui/art/icons/ability_templar_recovery.dds",
  esoSkillId: 27197,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
