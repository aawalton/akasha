import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const summonShade = {
  id: "019e6f53-a7dc-7443-a4dd-09322eef5d19",
  type: "page-type/temper-skill",
  slug: "summon-shade",
  title: "Summon Shade",
  key: "summon-shade",
  baseName: "Summon Shade",
  description:
    "Summon a shade version of yourself to attack an enemy and fight at your side for |cffffff20|r seconds. \n\nThe shade slashes at an enemy, dealing |cffffff1613|r Magic Damage once every |cffffff2|r seconds, and inflicts Minor Maim for |cffffff4|r seconds, reducing the enemy's damage done by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_nightblade_001.dds",
  esoSkillId: 33211,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 1289,
  createdAt: "2026-05-28T16:03:33.980Z",
  updatedAt: "2026-10-21T02:29:23.868Z",
  equations: [
    "<<1>> = 20 seconds (Constant, +2 seconds with dark-veil)",
    "<<2>> = 0.02 MaxStat + 0.21 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = Minor Maim (Constant)",
    "<<5>> = 4 seconds (Constant)",
    "<<6>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
