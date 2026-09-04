import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const frozenColossus = {
  id: "019e6f53-a24e-77d7-99ca-4b0a226fefa0",
  pageTypeSlug: "temper-skill",
  slug: "frozen-colossus",
  title: "Frozen Colossus",
  key: "frozen-colossus",
  baseName: "Frozen Colossus",
  description:
    '"Unleash a frostbitten Flesh Colossus to pulverize enemies in the area. The Colossus smashes the ground three times over |cffffff3|r seconds, dealing |cffffff11378|r Frost Damage with each smash.\\n\\nDealing damage applies Major Vulnerability to any enemy hit for |cffffff12|r seconds, increasing their damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_necromancer_006.dds",
  esoSkillId: 122174,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "necromancer-grave-lord",
  skillType: "ultimate",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
