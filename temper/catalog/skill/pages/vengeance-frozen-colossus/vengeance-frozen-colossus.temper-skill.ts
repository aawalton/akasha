import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceFrozenColossus = {
  id: "019e6f53-a916-7779-8e4c-2ffaa54fa23f",
  type: "page-type/temper-skill",
  slug: "vengeance-frozen-colossus",
  title: "Vengeance Frozen Colossus",
  key: "vengeance-frozen-colossus",
  baseName: "Vengeance Frozen Colossus",
  description:
    "Unleash a frostbitten Flesh Colossus to pulverize up to 3 enemies in the area. The Colossus smashes the ground three times over |cffffff3|r seconds, dealing |cffffff13720|r Frost Damage with each smash.",
  icon: "/esoui/art/icons/ability_necromancer_006.dds",
  esoSkillId: 238129,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-necromancer-grave-lord",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1480,
  createdAt: "2026-05-28T16:03:34.294Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 12 (Constant)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 12250 Frost Damage (Constant)",
  ],
} as const satisfies TemperSkill
