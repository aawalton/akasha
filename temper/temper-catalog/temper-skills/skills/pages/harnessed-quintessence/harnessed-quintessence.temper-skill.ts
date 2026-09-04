import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const harnessedQuintessence = {
  id: "019e6245-a69b-7cda-b85a-527e00ddccbb",
  pageTypeSlug: "temper-skill",
  slug: "harnessed-quintessence",
  title: "Harnessed Quintessence",
  key: "harnessed-quintessence",
  baseName: "Harnessed Quintessence",
  description:
    '"You master the warp and weft of your very soul. When you are restored Magicka or Stamina, increase your Weapon and Spell Damage by 284 for 10 seconds."',
  icon: "/esoui/art/icons/passive_arcanist_02.dds",
  esoSkillId: 184858,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "passive",
  subcategoryId: "arcanist-herald-of-the-tome",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
