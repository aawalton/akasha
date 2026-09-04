import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const corrosiveArmor17878 = {
  id: "019e6f53-a028-761e-a9fa-32a564b36db0",
  pageTypeSlug: "temper-skill",
  slug: "corrosive-armor-17878",
  title: "Corrosive Armor",
  key: "corrosive-armor-17878",
  baseName: "Magma Armor",
  description:
    '"Ignite the molten lava in your veins, limiting incoming damage to |cffffff6|r% of your Max Health and dealing |cffffff5632|r Flame Damage to nearby enemies each second for |cffffff10|r seconds. \\n\\nWhile active your direct damage attacks ignore enemy Physical and Spell Resistance but you cannot generate Ultimate."',
  icon: "/esoui/art/icons/ability_dragonknight_018_b.dds",
  esoSkillId: 17878,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "ultimate",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
