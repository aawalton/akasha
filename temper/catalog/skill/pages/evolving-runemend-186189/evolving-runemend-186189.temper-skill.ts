import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const evolvingRunemend186189 = {
  id: "019e6f53-a1b4-78da-a3eb-893870c2470c",
  type: "page-type/temper-skill",
  slug: "evolving-runemend-186189",
  title: "Evolving Runemend",
  key: "evolving-runemend-186189",
  baseName: "Runemend",
  description:
    "Craft a series of adaptive Apocryphal runes, then propel them at yourself or an ally in front of you. The runes heal for |cffffff3653|r Health three times, an additional |cffffff4107|r Health over |cffffff6|r seconds, and generate Crux.\n\nEach active Crux reduces the cost of this ability by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_arcanist_013_a.dds",
  esoSkillId: 186189,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 468,
  createdAt: "2026-05-28T16:03:32.404Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.01875 MaxStat + 0.196875 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, DOT, 4s duration, 2s tick, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
