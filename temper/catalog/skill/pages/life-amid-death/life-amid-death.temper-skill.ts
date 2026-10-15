import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lifeAmidDeath = {
  id: "019e6f53-a3e1-75ae-9417-cfc79612ead3",
  type: "page-type/temper-skill",
  slug: "life-amid-death",
  title: "Life amid Death",
  key: "life-amid-death",
  baseName: "Life amid Death",
  description:
    "Release residual fragments of fallen souls at the target location, healing you and your allies for |cffffff7305|r Health.\n\nConsumes a corpse on cast to continue to heal you and your allies in the area for |cffffff7300|r Health over |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_necromancer_016.dds",
  esoSkillId: 115315,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 737,
  createdAt: "2026-05-28T16:03:32.961Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.02 MaxStat + 0.21 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, DOT, 4s duration, 1s tick, R2 = 1)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
