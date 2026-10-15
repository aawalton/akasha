import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceHealingRitual = {
  id: "019e6f53-a921-7c30-950a-6995dc01c641",
  type: "page-type/temper-skill",
  slug: "vengeance-healing-ritual",
  title: "Vengeance Healing Ritual",
  key: "vengeance-healing-ritual",
  baseName: "Vengeance Healing Ritual",
  description:
    "Focus your spiritual devotion, healing you or up to 3 nearby allies for |cffffff12049|r Health.",
  icon: "/esoui/art/icons/ability_templar_healing_ritual.dds",
  esoSkillId: 238018,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1488,
  createdAt: "2026-05-28T16:03:34.305Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 11813 (Constant)"],
} as const satisfies TemperSkill
