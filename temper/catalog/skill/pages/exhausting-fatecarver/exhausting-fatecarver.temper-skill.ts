import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const exhaustingFatecarver = {
  id: "019e6245-a677-7edb-a0ca-ca62e83ca80b",
  type: "page-type/temper-skill",
  slug: "exhausting-fatecarver",
  title: "Exhausting Fatecarver",
  key: "exhausting-fatecarver",
  baseName: "Fatecarver",
  description:
    "Harness pure knowledge into a beam of energy that scars the world in front of you. Channel the beam for up to 4 seconds, dealing 879 Magic Damage every 0.3 seconds to up to 6 enemies and snares them by 15%.\n\nCasting Exhausting Fatecarver consumes all Crux and increases damage done by 33%, duration by 0.3 seconds, and snare by 15% per Crux spent.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_arcanist_002_a.dds",
  esoSkillId: 40183122,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 473,
  createdAt: "2026-05-26T03:13:12.311Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 0.039099 MaxStat + 0.41054 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 0.3 seconds (Constant)",
    "<<4>> = 15% (Constant)",
    "<<5>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
