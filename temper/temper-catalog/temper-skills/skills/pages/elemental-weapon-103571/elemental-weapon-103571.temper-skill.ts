import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalWeapon103571 = {
  id: "019e6f53-a12e-784e-9a6f-c872e7b03e6b",
  pageTypeSlug: "temper-skill",
  slug: "elemental-weapon-103571",
  title: "Elemental Weapon",
  key: "elemental-weapon-103571",
  baseName: "Imbue Weapon",
  description:
    '"Infuse your weapon with power, causing your next Light Attack used within |cffffff2|r seconds to deal an additional |cffffff7509|r Magic Damage and apply the Burning, Concussion, or Chill elemental status effect.\\n\\nIf the power is not consumed in time, you restore |cffffff1668|r Magicka."',
  icon: "/esoui/art/icons/ability_psijic_003_a.dds",
  esoSkillId: 103571,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 1,
  rank: 3,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
