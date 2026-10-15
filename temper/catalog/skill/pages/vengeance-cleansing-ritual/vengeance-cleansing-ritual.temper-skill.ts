import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceCleansingRitual = {
  id: "019e6f53-a8d4-799e-a660-31214ad14c31",
  type: "page-type/temper-skill",
  slug: "vengeance-cleansing-ritual",
  title: "Vengeance Cleansing Ritual",
  key: "vengeance-cleansing-ritual",
  baseName: "Vengeance Cleansing Ritual",
  description:
    "Exalt in the sacred light of the Aedra, cleansing up to |cffffff3|r negative effects from yourself.",
  icon: "/esoui/art/icons/ability_templar_cleansing_ritual.dds",
  esoSkillId: 238026,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1435,
  createdAt: "2026-05-28T16:03:34.228Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3 (Constant)"],
} as const satisfies TemperSkill
