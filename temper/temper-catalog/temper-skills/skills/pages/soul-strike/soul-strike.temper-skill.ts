import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulStrike = {
  id: "019e6f53-a777-7788-adc2-7eef0375bf6e",
  pageTypeSlug: "temper-skill",
  slug: "soul-strike",
  title: "Soul Strike",
  key: "soul-strike",
  baseName: "Soul Strike",
  description:
    '"Burn an enemy from the inside with soulfire, dealing |cffffff48576|r Magic Damage over |cffffff5|r seconds.\\n\\nWhile channeling this ability, you gain immunity to all disabling effects.\\n\\nEnemies affected by this ability are revealed for |cffffff3|r seconds and may not enter stealth or invisibility.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_otherclass_002.dds",
  esoSkillId: 39270,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "world-soul-magic",
  skillType: "ultimate",
  subcategoryId: "world-soul-magic",
} as const satisfies TemperSkill
