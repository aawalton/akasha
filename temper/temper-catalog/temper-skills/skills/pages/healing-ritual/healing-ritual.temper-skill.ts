import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healingRitual = {
  id: "019e6f53-a2e1-7019-bca6-a60f27b28a00",
  pageTypeSlug: "temper-skill",
  slug: "healing-ritual",
  title: "Healing Ritual",
  key: "healing-ritual",
  baseName: "Healing Ritual",
  description:
    '"Focus your spiritual devotion, healing you and nearby allies for |cffffff8220|r Health."',
  icon: "/esoui/art/icons/ability_templar_healing_ritual.dds",
  esoSkillId: 22304,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
