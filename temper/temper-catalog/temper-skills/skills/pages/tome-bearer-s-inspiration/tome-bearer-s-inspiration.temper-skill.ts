import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const tomeBearerSInspiration = {
  id: "019e6f53-a847-7641-9809-d341dfa9f166",
  pageTypeSlug: "temper-skill",
  slug: "tome-bearer-s-inspiration",
  title: "Tome-Bearer's Inspiration",
  key: "tome-bearer-s-inspiration",
  baseName: "Tome-Bearer's Inspiration",
  description:
    '"Etch a series of runes onto your weapon that pulse with power once every |cffffff5|r seconds. Each pulse enhances your class abilities, and striking an enemy with one deals an additional |cffffff4036|r Magic Damage and generates Crux if you have none.\\n\\nWhile slotted on either ability bar, gain Major Brutality and Major Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%."',
  icon: "/esoui/art/icons/ability_arcanist_005.dds",
  esoSkillId: 186452,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
