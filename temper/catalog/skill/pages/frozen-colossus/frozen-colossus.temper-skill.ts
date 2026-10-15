import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const frozenColossus = {
  id: "019e6f53-a24e-77d7-99ca-4b0a226fefa0",
  type: "page-type/temper-skill",
  slug: "frozen-colossus",
  title: "Frozen Colossus",
  key: "frozen-colossus",
  baseName: "Frozen Colossus",
  description:
    "Unleash a frostbitten Flesh Colossus to pulverize enemies in the area. The Colossus smashes the ground three times over |cffffff3|r seconds, dealing |cffffff11378|r Frost Damage with each smash.\n\nDealing damage applies Major Vulnerability to any enemy hit for |cffffff12|r seconds, increasing their damage taken by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_necromancer_006.dds",
  esoSkillId: 122174,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 545,
  createdAt: "2026-05-28T16:03:32.558Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.149957 MaxStat + 1.57455 MaxPower + 0.826821 (Ultimate, ratio = 10.50, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 12 seconds (Constant)",
    "<<4>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
