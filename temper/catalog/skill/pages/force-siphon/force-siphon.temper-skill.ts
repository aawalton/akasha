import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const forceSiphon = {
  id: "019e6f53-a22c-71ea-acdd-74f312e3106f",
  type: "page-type/temper-skill",
  slug: "force-siphon",
  title: "Force Siphon",
  key: "force-siphon",
  baseName: "Force Siphon",
  description:
    "Focus your staff's power to apply Minor Lifesteal to an enemy for |cffffff24|r seconds, healing you and your allies for |cffffff612|r Health every |cffffff1|r second when damaging them.",
  icon: "/esoui/art/icons/ability_restorationstaff_005.dds",
  esoSkillId: 31531,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 534,
  createdAt: "2026-05-28T16:03:32.524Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Lifesteal (Constant)",
    "<<2>> = 18 seconds (Constant)",
    "<<3>> = 600 (Constant)",
    "<<4>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
