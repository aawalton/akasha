import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const evolvingRunemend = {
  id: "019e6245-a676-7e3e-af4c-3b14a5478369",
  type: "page-type/temper-skill",
  slug: "evolving-runemend",
  title: "Evolving Runemend",
  key: "evolving-runemend",
  baseName: "Runemend",
  description:
    "Craft a series of adaptive Apocryphal runes, then propel them at yourself or an ally in front of you. The runes heal for 1161 Health three times, an additional 1302 Health over 6 seconds, and generate Crux.\n\nEach active Crux reduces the cost of this ability by 3%.",
  icon: "/esoui/art/icons/ability_arcanist_013_a.dds",
  esoSkillId: 40186189,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 467,
  createdAt: "2026-05-26T03:13:12.310Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.01936875 MaxStat + 0.203371875 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, DOT, 4s duration, 2s tick, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
