import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const scorch = {
  id: "019e6f53-a6c3-776d-b0d2-da0d793f5575",
  pageTypeSlug: "temper-skill",
  slug: "scorch",
  title: "Scorch",
  key: "scorch",
  baseName: "Scorch",
  description:
    '"Stir a group of shalk that attack after |cffffff3|r seconds, dealing |cffffff9215|r Magic Damage to enemies in front of you.\\n\\nAfter the shalk complete their attack, they burrow underground for |cffffff6|r seconds and then resurface again, dealing |cffffff12802|r Magic Damage to enemies in front of you."',
  icon: "/esoui/art/icons/ability_warden_015.dds",
  esoSkillId: 86009,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
