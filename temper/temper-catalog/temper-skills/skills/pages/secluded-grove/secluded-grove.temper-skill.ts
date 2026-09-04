import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const secludedGrove = {
  id: "019e6f53-a6d2-7002-bfef-1f872ffcf086",
  pageTypeSlug: "temper-skill",
  slug: "secluded-grove",
  title: "Secluded Grove",
  key: "secluded-grove",
  baseName: "Secluded Grove",
  description:
    '"Swell a healing forest at the target location, instantly healing the most injured friendly target for |cffffff8767|r Health. The forest continues to heal you and your allies in the area for |cffffff2921|r Health every |cffffff1|r second for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_warden_012.dds",
  esoSkillId: 85532,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "warden-green-balance",
  skillType: "ultimate",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
