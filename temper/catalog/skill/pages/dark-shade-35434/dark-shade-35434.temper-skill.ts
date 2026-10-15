import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const darkShade35434 = {
  id: "019e6f53-a07c-789e-97c2-3daae20106c6",
  type: "page-type/temper-skill",
  slug: "dark-shade-35434",
  title: "Dark Shade",
  key: "dark-shade-35434",
  baseName: "Summon Shade",
  description:
    "Summon a shade version of yourself to attack an enemy and fight at your side for |cffffff20|r seconds. \n\nThe shade attacks nearby enemies within |cffffff9|r meters of it, dealing |cffffff2292|r Magic Damage once every |cffffff2|r seconds and afflicting them with Minor Maim for |cffffff4|r seconds, reducing their damage done by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_nightblade_001_a.dds",
  esoSkillId: 35434,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 312,
  createdAt: "2026-05-28T16:03:32.092Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 0.026858 MaxStat + 0.28201 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = Minor Maim (Constant)",
    "<<5>> = 4 seconds (Constant)",
    "<<6>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
