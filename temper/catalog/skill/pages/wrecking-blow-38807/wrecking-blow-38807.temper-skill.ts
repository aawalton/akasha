import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const wreckingBlow38807 = {
  id: "019e6f53-aa04-763a-a73f-80f29cf4a4ac",
  type: "page-type/temper-skill",
  slug: "wrecking-blow-38807",
  title: "Wrecking Blow",
  key: "wrecking-blow-38807",
  baseName: "Uppercut",
  description:
    "Slam an enemy with an upward swing, dealing |cffffff9595|r Physical Damage.\n\nGrants you Major Berserk and Empower for |cffffff3|r seconds, increasing damage done by |cffffff10|r% and increasing damage done with Heavy Attacks against monsters by |cffffff70|r%.",
  icon: "/esoui/art/icons/ability_2handed_001_b.dds",
  esoSkillId: 38807,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 1629,
  createdAt: "2026-05-28T16:03:34.532Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.118795 MaxStat + 1.24735 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, 0.5s cooldown, R2 = 1)",
    "<<2>> = Major Berserk (Constant)",
    "<<3>> = Empower (Constant)",
    "<<4>> = 3 seconds (Constant)",
    "<<5>> = 10% (Constant)",
    "<<6>> = 150% (Constant)",
  ],
} as const satisfies TemperSkill
