import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const standardOfMight32947 = {
  id: "019e6f53-a7b5-7c30-8df1-8715d51cfe33",
  pageTypeSlug: "temper-skill",
  slug: "standard-of-might-32947",
  title: "Standard of Might",
  key: "standard-of-might-32947",
  baseName: "Dragonknight Standard",
  description:
    '"Call down a battle standard for |cffffff15|r seconds, rallying you and allies inside the area, increasing Weapon and Spell Damage by |cffffff300|r and reducing damage taken by |cffffff10|r%. You gain an additional |cffffff15|r% damage done and reduced damage taken and |cffffff300|r Weapon and Spell Damage.\\n\\nAn ally near the standard can activate the Shackle synergy, dealing |cffffff12393|r Flame Damage to enemies in the area and immobilizing them for |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_006_b.dds",
  esoSkillId: 32947,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "ultimate",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
