import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceEarthspikeMantle = {
  id: "019e6f53-a8f8-7a90-a46a-f2be9bcb2f17",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-earthspike-mantle",
  title: "Vengeance Earthspike Mantle",
  key: "vengeance-earthspike-mantle",
  baseName: "Vengeance Earthspike Mantle",
  description:
    '"Release your inner Dragon to gain Major Resolve, increasing your Physical and Spell Resistance by |cffffff5948|r for |cffffff30|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_007.dds",
  esoSkillId: 237630,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-earthen-heart",
} as const satisfies TemperSkill
