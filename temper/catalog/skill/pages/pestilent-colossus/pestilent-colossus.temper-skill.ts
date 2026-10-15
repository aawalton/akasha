import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pestilentColossus = {
  id: "019e6245-a6e1-7ba0-b050-d71e5b838cbc",
  type: "page-type/temper-skill",
  slug: "pestilent-colossus",
  title: "Pestilent Colossus",
  key: "pestilent-colossus",
  baseName: "Frozen Colossus",
  description:
    "Unleash a pestilent Flesh Colossus to pulverize enemies in the area. The Colossus smashes the ground three times over 3 seconds, dealing 3200, 3360, and 3528 Disease Damage with the first, second, and third smash.\n\nDealing damage applies the Diseased status effect and Major Vulnerability to any enemy hit for 12 seconds, increasing their damage taken by 10%.",
  icon: "/esoui/art/icons/ability_necromancer_006_b.dds",
  esoSkillId: 40122395,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 886,
  createdAt: "2026-05-26T03:13:12.417Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.16006335 MaxStat + 1.68067034 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Disease, AOE, Direct, R2 = 1)",
    "<<3>> = 0.176069685 MaxStat + 1.84872911 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Disease, AOE, Direct, R2 = 1)",
    "<<4>> = 0.193676137 MaxStat + 2.03360512 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Disease, AOE, Direct, R2 = 1)",
    "<<5>> = 12 seconds (Constant)",
    "<<6>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
