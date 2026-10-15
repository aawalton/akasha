import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const siphonSpirit = {
  id: "019e6226-0114-790b-a3df-81757c9eb3c3",
  type: "page-type/temper-skill",
  slug: "siphon-spirit",
  title: "Siphon Spirit",
  key: "siphon-spirit",
  baseName: "Force Siphon",
  description:
    "Focus your staff's power to apply Minor Lifesteal to an enemy for 30 seconds, healing you and your allies for 600 Health every 1 second when damaging them.\n\nAlso applies Minor Magickasteal to the enemy for 30 seconds, causing you and your allies to restore 168 Magicka every 1 second when damaging them.",
  icon: "/esoui/art/icons/ability_restorationstaff_005_a.dds",
  esoSkillId: 41225,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1193,
  createdAt: "2026-05-26T02:38:38.356Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Lifesteal (Constant)",
    "<<2>> = 30 seconds (Constant)",
    "<<3>> = 600 (Constant)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = Minor Magickasteal (Constant)",
    "<<6>> = 30 seconds (Constant)",
    "<<7>> = 168 (Constant)",
    "<<8>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
