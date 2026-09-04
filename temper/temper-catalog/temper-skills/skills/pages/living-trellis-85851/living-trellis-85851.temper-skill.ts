import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const livingTrellis85851 = {
  id: "019e6f53-a414-7b38-b678-f2e6be3075e0",
  pageTypeSlug: "temper-skill",
  slug: "living-trellis-85851",
  title: "Living Trellis",
  key: "living-trellis-85851",
  baseName: "Living Vines",
  description:
    '"Grow vines to embrace you or the lowest health ally in front of you for |cffffff10|r seconds. The vines heal the target for |cffffff2262|r Health each time they take damage. This effect can occur once every |cffffff1|r second.\\n\\nWhen the vines expire, they heal the target for an additional |cffffff5478|r Health."',
  icon: "/esoui/art/icons/ability_warden_010_b.dds",
  esoSkillId: 85851,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
