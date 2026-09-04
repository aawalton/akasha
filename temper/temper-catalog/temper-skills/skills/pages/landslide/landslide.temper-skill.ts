import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const landslide = {
  id: "019e6f53-a3ba-73f6-9fd3-638d9df057f8",
  pageTypeSlug: "temper-skill",
  slug: "landslide",
  title: "Landslide",
  key: "landslide",
  baseName: "Landslide",
  description:
    '"Given time, the smallest rock on the mountain can cascade into pure devastation.\\n\\nWhenever you deal damage you gain a stack of Landslide which increases your damage done by |cffffff1|r% per stack, up to |cffffff10|r times. This effect can occur once every |cffffff10|r seconds.\\n\\nEvery |cffffff2|r seconds you do not deal damage, you lose a stack."',
  icon: "/esoui/art/icons/ability_weapon_005.dds",
  esoSkillId: 29463,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "passive",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
