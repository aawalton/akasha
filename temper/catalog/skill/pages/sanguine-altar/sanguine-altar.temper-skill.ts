import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const sanguineAltar = {
  id: "019e6238-c306-7a6a-8ee4-6bbf73ecb212",
  type: "page-type/temper-skill",
  slug: "sanguine-altar",
  title: "Sanguine Altar",
  key: "sanguine-altar",
  baseName: "Blood Altar",
  description:
    "Sacrifice your life essence to conjure a fountain of blood to apply Minor Lifesteal to enemies in the area, healing you and your allies for 600 Health every 1 second when damaging them.\n\nAllies in the area can activate the Blood Funnel synergy, healing for 40% of their Max Health.",
  icon: "/esoui/art/icons/ability_undaunted_001_b.dds",
  esoSkillId: 43266,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 1124,
  createdAt: "2026-05-26T02:59:07.654Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Lifesteal (Constant)",
    "<<2>> = 600 (Constant)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = Blood Funnel (Constant)",
    "<<5>> = 40% (Constant)",
  ],
} as const satisfies TemperSkill
