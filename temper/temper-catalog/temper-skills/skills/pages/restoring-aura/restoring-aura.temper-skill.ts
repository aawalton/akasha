import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const restoringAura = {
  id: "019e6f53-a62c-7bc6-9975-0a899621c040",
  pageTypeSlug: "temper-skill",
  slug: "restoring-aura",
  title: "Restoring Aura",
  key: "restoring-aura",
  baseName: "Restoring Aura",
  description:
    '"Champion the cause of divine glory to apply Minor Endurance, Minor Fortitude, and Minor Intellect to nearby group members for |cffffff20|r seconds, increasing Health, Magicka, and Stamina Recovery by |cffffff15|r%.\\n\\nWhile slotted on either bar you gain these effects."',
  icon: "/esoui/art/icons/ability_templar_restoring_sigil.dds",
  esoSkillId: 26209,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
