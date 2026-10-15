import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pestilentColossus122395 = {
  id: "019e6f53-a4f6-7925-9113-0dd98e61e900",
  type: "page-type/temper-skill",
  slug: "pestilent-colossus-122395",
  title: "Pestilent Colossus",
  key: "pestilent-colossus-122395",
  baseName: "Frozen Colossus",
  description:
    "Unleash a pestilent Flesh Colossus to pulverize enemies in the area. The Colossus smashes the ground three times over |cffffff3|r seconds, dealing |cffffff11754|r, |cffffff12342|r, and |cffffff12958|r Disease Damage with the first, second, and third smash.\n\nDealing damage applies the Diseased status effect and Major Vulnerability to any enemy hit for |cffffff12|r seconds, increasing their damage taken by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_necromancer_006_b.dds",
  esoSkillId: 122395,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 887,
  createdAt: "2026-05-28T16:03:33.238Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Disease, AOE, Direct, R2 = 1)",
    "<<3>> = 0.170445 MaxStat + 1.78967 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Disease, AOE, Direct, R2 = 1)",
    "<<4>> = 0.187489 MaxStat + 1.96864 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Disease, AOE, Direct, R2 = 1)",
    "<<5>> = 12 seconds (Constant)",
    "<<6>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
