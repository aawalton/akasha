import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dampenMagic39186 = {
  id: "019e6f53-a06d-76bf-a7b9-a98d18298305",
  pageTypeSlug: "temper-skill",
  slug: "dampen-magic-39186",
  title: "Dampen Magic",
  key: "dampen-magic-39186",
  baseName: "Annulment",
  description:
    '"Convert a portion of your Magicka into a protective ward, gaining a damage shield that absorbs |cffffff5046|r damage for |cffffff6|r seconds. Damage shield strength capped at |cffffff60|r% of your Max Health.\\n\\nEach piece of Light Armor worn increases the amount of damage absorbed by |cffffff6|r%."',
  icon: "/esoui/art/icons/ability_armor_003_a.dds",
  esoSkillId: 39186,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 1,
  rank: 22,
  skillLineId: "armor-light-armor",
  skillType: "active",
  subcategoryId: "armor-light-armor",
} as const satisfies TemperSkill
