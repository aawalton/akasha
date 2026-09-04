import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const igneousWeapons31874 = {
  id: "019e6f53-a34c-741f-b5fb-63946e05c833",
  pageTypeSlug: "temper-skill",
  slug: "igneous-weapons-31874",
  title: "Igneous Weapons",
  key: "igneous-weapons-31874",
  baseName: "Molten Weapons",
  description:
    '"Charge you and your grouped allies\' weapons with volcanic power to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff1|r minute.\\n\\nWhile active, dealing damage with Light and Heavy Attacks causes an additional |cffffff1562|r Flame Damage, up to once every |cffffff2|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_015_a.dds",
  esoSkillId: 31874,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
