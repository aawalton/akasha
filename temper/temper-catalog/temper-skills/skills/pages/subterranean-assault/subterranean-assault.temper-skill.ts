import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const subterraneanAssault = {
  id: "019e6245-a744-786d-afb2-caea198c3fc7",
  pageTypeSlug: "temper-skill",
  slug: "subterranean-assault",
  title: "Subterranean Assault",
  key: "subterranean-assault",
  baseName: "Scorch",
  description:
    '"Stir a group of shalk that attack after 3 seconds, dealing 2591 Poison Damage to enemies in front of you.\\n\\nAfter the shalk complete their attack, they burrow underground for 3 seconds and then resurface again, dealing 2591 Poison Damage to enemies in front of you."',
  icon: "/esoui/art/icons/ability_warden_015_b.dds",
  esoSkillId: 93791,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
