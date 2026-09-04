import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const natureSGift = {
  id: "019e6f53-a4ae-73bb-8180-895b43b97902",
  pageTypeSlug: "temper-skill",
  slug: "nature-s-gift",
  title: "Nature's Gift",
  key: "nature-s-gift",
  baseName: "Nature's Gift",
  description:
    '"When you heal an ally with a Green Balance ability, you gain |cffffff138|r Magicka or |cffffff138|r Stamina, whichever resource pool is lower. Each effect can occur once every |cffffff1|r second."',
  icon: "/esoui/art/icons/passive_warden_006.dds",
  esoSkillId: 85878,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "warden-green-balance",
  skillType: "passive",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
