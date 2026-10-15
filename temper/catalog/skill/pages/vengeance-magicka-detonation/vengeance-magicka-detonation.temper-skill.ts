import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceMagickaDetonation = {
  id: "019e6f53-a93a-7664-bd33-256c8c511dea",
  type: "page-type/temper-skill",
  slug: "vengeance-magicka-detonation",
  title: "Vengeance Magicka Detonation",
  key: "vengeance-magicka-detonation",
  baseName: "Vengeance Magicka Detonation",
  description:
    "Curse an enemy with a magical bomb that explodes after |cffffff4|r seconds, dealing |cffffff3562|r Magic Damage. You cannot recast this ability on a target you have affected.\n\nThis damage is increased by |cffffff100|r% for each additional Vengeance Magicka Detonation you have active, and cannot be dodged.",
  icon: "/esoui/art/icons/ability_ava_magicka_detonation.dds",
  esoSkillId: 244541,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 1505,
  createdAt: "2026-05-28T16:03:34.330Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 3360 Magic Damage (Constant)",
    "<<3>> = 100% (Constant)",
    "<<4>> = Vengeance Magicka Detonation (Constant)",
  ],
} as const satisfies TemperSkill
