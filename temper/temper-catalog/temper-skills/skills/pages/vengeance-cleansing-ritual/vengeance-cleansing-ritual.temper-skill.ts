import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceCleansingRitual = {
  id: "019e6f53-a8d4-799e-a660-31214ad14c31",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-cleansing-ritual",
  title: "Vengeance Cleansing Ritual",
  key: "vengeance-cleansing-ritual",
  baseName: "Vengeance Cleansing Ritual",
  description:
    '"Exalt in the sacred light of the Aedra, cleansing up to |cffffff3|r negative effects from yourself."',
  icon: "/esoui/art/icons/ability_templar_cleansing_ritual.dds",
  esoSkillId: 238026,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-restoring-light",
  skillType: "active",
  subcategoryId: "vengeance-templar-restoring-light",
} as const satisfies TemperSkill
