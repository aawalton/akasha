import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceForceSiphon = {
  id: "019e6f53-a913-7a18-bdba-8310acd56e77",
  type: "page-type/temper-skill",
  slug: "vengeance-force-siphon",
  title: "Vengeance Force Siphon",
  key: "vengeance-force-siphon",
  baseName: "Vengeance Force Siphon",
  description:
    "Focus your staff's power to apply Minor Lifesteal and Minor Magickasteal to an enemy for |cffffff20|r seconds, healing you and your allies for |cffffff600|r Health and restoring |cffffff168|r Magicka every |cffffff1|r second when damaging them.",
  icon: "/esoui/art/icons/ability_restorationstaff_005.dds",
  esoSkillId: 241536,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1478,
  createdAt: "2026-05-28T16:03:34.291Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Lifesteal (Constant)",
    "<<2>> = Minor Magickasteal (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 600 (Constant)",
    "<<5>> = 168 (Constant)",
    "<<6>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
