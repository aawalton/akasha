import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const exhaustingFatecarver183122 = {
  id: "019e6f53-a1bd-78ad-b6c4-02e2a85e32fd",
  type: "page-type/temper-skill",
  slug: "exhausting-fatecarver-183122",
  title: "Exhausting Fatecarver",
  key: "exhausting-fatecarver-183122",
  baseName: "Fatecarver",
  description:
    "Harness pure knowledge into a beam of energy that scars the world in front of you. Channel the beam for up to |cffffff4|r seconds, dealing |cffffff3229|r Magic Damage every |cffffff0.3|r seconds to up to 6 enemies and snares them by |cffffff15|r%.\n\nCasting Exhausting Fatecarver consumes all Crux and increases damage done by |cffffff33|r%, duration by |cffffff0.3|r seconds, and snare by |cffffff15|r% per Crux spent.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_arcanist_002_a.dds",
  esoSkillId: 183122,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 474,
  createdAt: "2026-05-28T16:03:32.413Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 0.039099 MaxStat + 0.41054 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 0.3 seconds (Constant)",
    "<<4>> = 12% (Constant)",
    "<<5>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
