import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDeathScythe = {
  id: "019e6f53-a8e8-703f-9c45-b300758c6a07",
  type: "page-type/temper-skill",
  slug: "vengeance-death-scythe",
  title: "Vengeance Death Scythe",
  key: "vengeance-death-scythe",
  baseName: "Vengeance Death Scythe",
  description:
    "Slice into your enemy's life force, dealing |cffffff2351|r Magic Damage and healing for |cffffff3016|r Health.",
  icon: "/esoui/art/icons/ability_necromancer_007.dds",
  esoSkillId: 238137,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 1448,
  createdAt: "2026-05-28T16:03:34.248Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.11251 Health (Health, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.15 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
