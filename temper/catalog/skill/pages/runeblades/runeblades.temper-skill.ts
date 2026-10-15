import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runeblades = {
  id: "019e6f53-a689-7eba-8c5f-e5f8246ea2b0",
  type: "page-type/temper-skill",
  slug: "runeblades",
  title: "Runeblades",
  key: "runeblades",
  baseName: "Runeblades",
  description:
    "Craft a series of Apocryphal runes before launching them at a foe, dealing |cffffff2423|r Magic Damage three times and generating Crux.\n\nThis ability deals |cffffff3|r% increased damage for each active Crux when cast.",
  icon: "/esoui/art/icons/ability_arcanist_001.dds",
  esoSkillId: 185794,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1104,
  createdAt: "2026-05-28T16:03:33.641Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03 MaxStat + 0.315 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
