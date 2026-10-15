import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const introspection103665 = {
  id: "019e6f53-a38d-7a3e-ba08-116f44fbeb93",
  type: "page-type/temper-skill",
  slug: "introspection-103665",
  title: "Introspection",
  key: "introspection-103665",
  baseName: "Meditate",
  description:
    "Focus your body and mind into a meditative state, healing for |cffffff1836|r Health and restoring |cffffff1500|r Magicka and Stamina every |cffffff1|r second.\n\nMaintaining the channel increases the Health restored by |cffffff10|r% every tick, up to a maximum of |cffffff50|r%.\n\nYou will remain in a meditative state until you toggle this ability off or are interrupted.",
  icon: "/esoui/art/icons/ability_psijic_004_b.dds",
  esoSkillId: 103665,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 2,
  rank: 8,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
  hashPlace: 699,
  createdAt: "2026-05-28T16:03:32.877Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1700 (Constant)",
    "<<2>> = 1500 (Constant)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
