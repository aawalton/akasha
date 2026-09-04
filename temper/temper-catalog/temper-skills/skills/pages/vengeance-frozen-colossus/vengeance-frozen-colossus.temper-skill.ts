import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFrozenColossus = {
  id: "019e6f53-a916-7779-8e4c-2ffaa54fa23f",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-frozen-colossus",
  title: "Vengeance Frozen Colossus",
  key: "vengeance-frozen-colossus",
  baseName: "Vengeance Frozen Colossus",
  description:
    '"Unleash a frostbitten Flesh Colossus to pulverize up to 3 enemies in the area. The Colossus smashes the ground three times over |cffffff3|r seconds, dealing |cffffff13720|r Frost Damage with each smash."',
  icon: "/esoui/art/icons/ability_necromancer_006.dds",
  esoSkillId: 238129,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-grave-lord",
  skillType: "ultimate",
  subcategoryId: "vengeance-necromancer-grave-lord",
} as const satisfies TemperSkill
