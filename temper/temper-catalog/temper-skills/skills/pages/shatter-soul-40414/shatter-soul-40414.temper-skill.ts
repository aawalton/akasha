import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shatterSoul40414 = {
  id: "019e6f53-a6eb-7757-869d-d97588b7d9e2",
  pageTypeSlug: "temper-skill",
  slug: "shatter-soul-40414",
  title: "Shatter Soul",
  key: "shatter-soul-40414",
  baseName: "Soul Strike",
  description:
    '"Burn an enemy from the inside with soulfire, dealing |cffffff48576|r Magic Damage over |cffffff5|r seconds.  Upon completion, the soulfire overflows and explodes from the enemy, dealing |cffffff8814|r Magic Damage to all enemies near them.\\n\\nWhile channeling this ability, you gain immunity to all disabling effects.\\n\\nEnemies affected by this ability are revealed for |cffffff3|r seconds and may not enter stealth or invisibility.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_otherclass_002_a.dds",
  esoSkillId: 40414,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "world-soul-magic",
  skillType: "ultimate",
  subcategoryId: "world-soul-magic",
} as const satisfies TemperSkill
