import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const burningLight = {
  id: "019e6245-a60b-7d2a-a217-eb8deed6213a",
  pageTypeSlug: "temper-skill",
  slug: "burning-light",
  title: "Burning Light",
  key: "burning-light",
  baseName: "Burning Light",
  description:
    '"When you deal damage you generate a stack of Burning Light for 3 seconds. After reaching 4 stacks, you deal 500 Magic Damage to your target. This effect can stack once every half second and scales off the higher of your Weapon or Spell Damage."',
  icon: "/esoui/art/icons/ability_templar_028.dds",
  esoSkillId: 44730,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-aedric-spear",
  skillType: "passive",
  subcategoryId: "templar-aedric-spear",
  status: "unsupported",
} as const satisfies TemperSkill
