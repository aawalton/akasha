import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const quickSiphon = {
  id: "019e6226-0106-76e9-9869-6e4a7951614d",
  type: "page-type/temper-skill",
  slug: "quick-siphon",
  title: "Quick Siphon",
  key: "quick-siphon",
  baseName: "Force Siphon",
  description:
    "Focus your staff's power to apply Minor Lifesteal to an enemy for 30 seconds, healing you and your allies for 600 Health every 1 second when damaging them.\n\nWhen you or an ally hits the target, they gain Minor Expedition, which increases their Movement Speed by 15% for 4 seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_005_b.dds",
  esoSkillId: 41239,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 952,
  createdAt: "2026-05-26T02:38:38.342Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Lifesteal (Constant)",
    "<<2>> = 30 seconds (Constant)",
    "<<3>> = 600 (Constant)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = Minor Expedition (Constant)",
    "<<6>> = 15% (Constant)",
    "<<7>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
