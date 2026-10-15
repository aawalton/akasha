import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mistForm = {
  id: "019e6f53-a48e-75cf-8b82-c3930a52319f",
  type: "page-type/temper-skill",
  slug: "mist-form",
  title: "Mist Form",
  key: "mist-form",
  baseName: "Mist Form",
  description:
    "Disperse into a dark mist, causing the next |cffffff3|r projectiles to deal no damage to you for |cffffff1|r second while you dash forward and reappear at your target location after a short duration.\n\nCasting again within |cffffff4|r seconds costs |cffffff33|r% more Magicka.",
  icon: "/esoui/art/icons/ability_u26_vampire_05.dds",
  esoSkillId: 32986,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 9,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 832,
  createdAt: "2026-05-28T16:03:33.134Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1 second (Constant)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
