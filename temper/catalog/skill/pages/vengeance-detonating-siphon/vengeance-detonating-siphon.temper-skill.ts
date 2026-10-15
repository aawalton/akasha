import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDetonatingSiphon = {
  id: "019e6f53-a8ee-7ad4-99b2-557429af0f69",
  type: "page-type/temper-skill",
  slug: "vengeance-detonating-siphon",
  title: "Vengeance Detonating Siphon",
  key: "vengeance-detonating-siphon",
  baseName: "Vengeance Detonating Siphon",
  description:
    "Violently drain the last spark of life from a corpse, dealing |cffffff10143|r Disease Damage to up to 3 enemies around the corpse after |cffffff1|r second. Deals up to |cffffff100|r% more damage to enemies under |cffffff50|r% Health.",
  icon: "/esoui/art/icons/ability_necromancer_005_b.dds",
  esoSkillId: 238126,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 1452,
  createdAt: "2026-05-28T16:03:34.254Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 9056 Disease Damage (Constant)",
    "<<2>> = 12 (Constant)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 100 (Constant)",
    "<<5>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
