import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalWeapon = {
  id: "019e6238-c2b4-7a52-b035-eaa8d11bd62f",
  pageTypeSlug: "temper-skill",
  slug: "elemental-weapon",
  title: "Elemental Weapon",
  key: "elemental-weapon",
  baseName: "Imbue Weapon",
  description:
    '"Infuse your weapon with power, causing your next Light Attack used within 2 seconds to deal an additional 2160 Magic Damage and apply the Burning, Concussion, or Chill elemental status effect.\\n\\nIf the power is not consumed in time, you restore 1620 Magicka."',
  icon: "/esoui/art/icons/ability_psijic_003_a.dds",
  esoSkillId: 40103571,
  isMorph: true,
  learnedLevel: 3,
  lineRankNeeded: 3,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
