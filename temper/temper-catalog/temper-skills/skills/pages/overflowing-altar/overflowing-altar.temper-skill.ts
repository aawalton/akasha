import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const overflowingAltar = {
  id: "019e6238-c2f3-74e2-ad5e-3fe816c63b31",
  pageTypeSlug: "temper-skill",
  slug: "overflowing-altar",
  title: "Overflowing Altar",
  key: "overflowing-altar",
  baseName: "Blood Altar",
  description:
    '"Sacrifice your life essence to conjure a fountain of blood to apply Minor Lifesteal to enemies in the area, healing you and your allies for 600 Health every 1 second when damaging them.\\n\\nAllies in the area can activate the Blood Feast synergy, healing for 65% of their Max Health."',
  icon: "/esoui/art/icons/ability_undaunted_001_a.dds",
  esoSkillId: 43287,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
