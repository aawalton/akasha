import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const writhingRuneblades = {
  id: "019e6245-a771-7030-8707-e19040574111",
  type: "page-type/temper-skill",
  slug: "writhing-runeblades",
  title: "Writhing Runeblades",
  key: "writhing-runeblades",
  baseName: "Runeblades",
  description:
    "Craft a series of Apocryphal runes before launching them at a foe, dealing 718 Magic Damage three times and generating Crux. \n\nThis ability gains between 1095 and 2191 Weapon and Spell Critical rating and deals 3% increased damage for each active Crux when cast.",
  icon: "/esoui/art/icons/ability_arcanist_001_a.dds",
  esoSkillId: 40185803,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1630,
  createdAt: "2026-05-26T03:13:12.561Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03201267 MaxStat + 0.336133035 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 1095 (Constant)",
    "<<3>> = 2191 (Constant)",
    "<<4>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
