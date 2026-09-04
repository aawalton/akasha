import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const livingVines = {
  id: "019e6f53-a416-70bc-8219-67211df8e11a",
  pageTypeSlug: "temper-skill",
  slug: "living-vines",
  title: "Living Vines",
  key: "living-vines",
  baseName: "Living Vines",
  description:
    '"Grow vines to embrace you or the lowest health ally in front of you for |cffffff10|r seconds. The vines heal the target for |cffffff2191|r Health each time they take damage. This effect can occur once every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_warden_010.dds",
  esoSkillId: 85552,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
