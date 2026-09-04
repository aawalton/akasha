import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const acidSpray = {
  id: "019e6226-00ce-7fe3-90bd-0e3d18ef022b",
  pageTypeSlug: "temper-skill",
  slug: "acid-spray",
  title: "Acid Spray",
  key: "acid-spray",
  baseName: "Arrow Spray",
  description:
    '"Fire a burst of arrows in one shot, dealing 1742 Poison Damage to enemies in front of you, and dealing an additional 1635 Poison Damage over 5 seconds."',
  icon: "/esoui/art/icons/ability_bow_005_b.dds",
  esoSkillId: 40789,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
