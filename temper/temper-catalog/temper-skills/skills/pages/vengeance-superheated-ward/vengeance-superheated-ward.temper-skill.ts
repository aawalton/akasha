import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSuperheatedWard = {
  id: "019e6f53-a999-700a-bd9d-4572a4044221",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-superheated-ward",
  title: "Vengeance Superheated Ward",
  key: "vengeance-superheated-ward",
  baseName: "Vengeance Superheated Ward",
  description:
    '"Draw upon magma from under the earth to superheat the air around yourself or an ally, granting a damage shield that absorbs up to |cffffff15870|r damage for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_013.dds",
  esoSkillId: 237781,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-earthen-heart",
} as const satisfies TemperSkill
