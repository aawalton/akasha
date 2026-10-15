import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elementalSusceptibility = {
  id: "019e6226-00ed-717a-9f0e-6e4fe6cf90cd",
  type: "page-type/temper-skill",
  slug: "elemental-susceptibility",
  title: "Elemental Susceptibility",
  key: "elemental-susceptibility",
  baseName: "Weakness to Elements",
  description:
    "Send the elements to sap an enemy's defenses and afflict them with Major Breach for 30 seconds, reducing their Physical and Spell Resistance by 5948.\n\nEvery 7.5 seconds the enemy is afflicted with the Burning, Chilled, and Concussion status effect.",
  icon: "/esoui/art/icons/ability_destructionstaff_011b.dds",
  esoSkillId: 41556,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 410,
  createdAt: "2026-05-26T02:38:38.317Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Breach (Constant)",
    "<<2>> = 30 seconds (Constant)",
    "<<3>> = 5948 (Constant)",
    "<<4>> = 7.5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
