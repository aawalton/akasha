import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runemend = {
  id: "019e6f53-a691-7d30-9d3e-cbf7eb74e28d",
  type: "page-type/temper-skill",
  slug: "runemend",
  title: "Runemend",
  key: "runemend",
  baseName: "Runemend",
  description:
    "Craft a series of precise Apocryphal runes, then propel them at yourself or an ally in front of you. The runes heal for |cffffff3652|r Health three times and generate Crux.\n\nEach active Crux reduces the cost of this ability by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_arcanist_013.dds",
  esoSkillId: 183261,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 1109,
  createdAt: "2026-05-28T16:03:33.649Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05 MaxStat + 0.525 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
