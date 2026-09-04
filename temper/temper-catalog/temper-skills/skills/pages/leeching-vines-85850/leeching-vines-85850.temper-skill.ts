import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const leechingVines85850 = {
  id: "019e6f53-a3d9-7c7b-b354-8121cc731c69",
  pageTypeSlug: "temper-skill",
  slug: "leeching-vines-85850",
  title: "Leeching Vines",
  key: "leeching-vines-85850",
  baseName: "Living Vines",
  description:
    '"Grow vines to embrace you or the lowest health ally in front of you for |cffffff10|r seconds. The vines heal the target for |cffffff2262|r Health each time they take damage. This effect can occur once every |cffffff1|r second.\\n\\nThe vines apply Minor Lifesteal to enemies that damage the target for |cffffff10|r seconds, healing you and your allies for |cffffff612|r Health every |cffffff1|r second when damaging that enemy."',
  icon: "/esoui/art/icons/ability_warden_010_a.dds",
  esoSkillId: 85850,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
