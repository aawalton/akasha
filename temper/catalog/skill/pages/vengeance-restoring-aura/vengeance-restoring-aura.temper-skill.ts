import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRestoringAura = {
  id: "019e6f53-a965-75a2-8731-7d5ddc9d09a9",
  type: "page-type/temper-skill",
  slug: "vengeance-restoring-aura",
  title: "Vengeance Restoring Aura",
  key: "vengeance-restoring-aura",
  baseName: "Vengeance Restoring Aura",
  description:
    "Champion the cause of divine glory to apply Minor Endurance, Minor Fortitude, and Minor Intellect to nearby group members for |cffffff20|r seconds, increasing Health, Magicka, and Stamina Recovery by |cffffff15|r%.",
  icon: "/esoui/art/icons/ability_templar_restoring_sigil.dds",
  esoSkillId: 238019,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1535,
  createdAt: "2026-05-28T16:03:34.373Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Endurance (Constant)",
    "<<2>> = Minor Fortitude (Constant)",
    "<<3>> = Minor Intellect (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
