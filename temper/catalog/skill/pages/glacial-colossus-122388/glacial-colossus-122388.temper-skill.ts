import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const glacialColossus122388 = {
  id: "019e6f53-a288-7425-a76a-325f15505fa2",
  type: "page-type/temper-skill",
  slug: "glacial-colossus-122388",
  title: "Glacial Colossus",
  key: "glacial-colossus-122388",
  baseName: "Frozen Colossus",
  description:
    "Unleash a frostbitten Flesh Colossus to pulverize enemies in the area. The Colossus smashes the ground three times over |cffffff3|r seconds, dealing |cffffff11379|r Frost Damage with each smash. The final smash stuns all enemies hit for |cffffff4|r seconds.\n\nDealing damage applies Major Vulnerability to any enemy hit for |cffffff17|r seconds, increasing their damage taken by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_necromancer_006_a.dds",
  esoSkillId: 122388,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 566,
  createdAt: "2026-05-28T16:03:32.616Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.154901 MaxStat + 1.62725 MaxPower - 1.10979 (Ultimate, ratio = 10.51, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = 17 seconds (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
