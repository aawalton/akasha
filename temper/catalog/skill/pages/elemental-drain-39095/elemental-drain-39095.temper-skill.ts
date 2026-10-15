import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elementalDrain39095 = {
  id: "019e6f53-a114-75f8-aeca-7885deac9bb5",
  type: "page-type/temper-skill",
  slug: "elemental-drain-39095",
  title: "Elemental Drain",
  key: "elemental-drain-39095",
  baseName: "Weakness to Elements",
  description:
    "Send the elements to sap an enemy's defenses and afflict them with Major Breach for |cffffff1|r minute, reducing their Physical and Spell Resistance by |cffffff5948|r.\n\nAlso applies Minor Magickasteal to the enemy for |cffffff1|r minute, causing you and your allies to restore |cffffff168|r Magicka every |cffffff1|r second when damaging them.",
  icon: "/esoui/art/icons/ability_destructionstaff_011a.dds",
  esoSkillId: 39095,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 402,
  createdAt: "2026-05-28T16:03:32.244Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Breach (Constant)",
    "<<2>> = 57 seconds (Constant)",
    "<<3>> = 5948 (Constant)",
    "<<4>> = Minor Magickasteal (Constant)",
    "<<5>> = 168 (Constant)",
    "<<6>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
