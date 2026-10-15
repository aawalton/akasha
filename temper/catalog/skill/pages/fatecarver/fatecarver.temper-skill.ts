import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fatecarver = {
  id: "019e6f53-a1e1-73b4-b6e8-34ac89111c83",
  type: "page-type/temper-skill",
  slug: "fatecarver",
  title: "Fatecarver",
  key: "fatecarver",
  baseName: "Fatecarver",
  description:
    "Harness pure knowledge into a beam of energy that scars the world in front of you. Channel the beam for up to |cffffff4|r seconds, dealing |cffffff3230|r Magic Damage every |cffffff0.3|r seconds to up to 6 enemies.\n\nCasting Fatecarver consumes all Crux and increases damage done by |cffffff33|r% per Crux spent.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_arcanist_002.dds",
  esoSkillId: 185805,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 499,
  createdAt: "2026-05-28T16:03:32.449Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 0.03785 MaxStat + 0.397425 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 0.3 seconds (Constant)",
    "<<4>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
