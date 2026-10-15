import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elementalDrain = {
  id: "019e6226-00e9-7cd7-a37f-4c6b3d38c143",
  type: "page-type/temper-skill",
  slug: "elemental-drain",
  title: "Elemental Drain",
  key: "elemental-drain",
  baseName: "Weakness to Elements",
  description:
    "Send the elements to sap an enemy's defenses and afflict them with Major Breach for 1 minute, reducing their Physical and Spell Resistance by 5948.\n\nAlso applies Minor Magickasteal to the enemy for 1 minute, causing you and your allies to restore 168 Magicka every 1 second when damaging them.",
  icon: "/esoui/art/icons/ability_destructionstaff_011a.dds",
  esoSkillId: 41567,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 401,
  createdAt: "2026-05-26T02:38:38.313Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Breach (Constant)",
    "<<2>> = 1 minute (Constant)",
    "<<3>> = 5948 (Constant)",
    "<<4>> = Minor Magickasteal (Constant)",
    "<<5>> = 168 (Constant)",
    "<<6>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
