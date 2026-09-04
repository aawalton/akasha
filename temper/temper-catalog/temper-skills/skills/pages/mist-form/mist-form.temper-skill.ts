import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mistForm = {
  id: "019e6f53-a48e-75cf-8b82-c3930a52319f",
  pageTypeSlug: "temper-skill",
  slug: "mist-form",
  title: "Mist Form",
  key: "mist-form",
  baseName: "Mist Form",
  description:
    '"Disperse into a dark mist, causing the next |cffffff3|r projectiles to deal no damage to you for |cffffff1|r second while you dash forward and reappear at your target location after a short duration.\\n\\nCasting again within |cffffff4|r seconds costs |cffffff33|r% more Magicka."',
  icon: "/esoui/art/icons/ability_u26_vampire_05.dds",
  esoSkillId: 32986,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 9,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
