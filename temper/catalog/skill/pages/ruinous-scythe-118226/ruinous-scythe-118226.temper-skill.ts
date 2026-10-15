import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ruinousScythe118226 = {
  id: "019e6f53-a675-777e-8a4c-d8b072d51757",
  type: "page-type/temper-skill",
  slug: "ruinous-scythe-118226",
  title: "Ruinous Scythe",
  key: "ruinous-scythe-118226",
  baseName: "Death Scythe",
  description:
    "Slice into your enemy's life force, dealing |cffffff6611|r Bleed Damage, applying the Hemorrhaging status effect, and setting them Off Balance for |cffffff7|r seconds.\n\nYou heal for |cffffff3016|r Health for the first enemy hit, and an additional |cffffff1005|r for each additional enemy, up to five times. The healing of this ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_necromancer_007_b.dds",
  esoSkillId: 118226,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 1092,
  createdAt: "2026-05-28T16:03:33.621Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Bleed, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = Hemorrhaging (Constant)",
    "<<3>> = 7 seconds (Constant)",
    "<<4>> = 0.15 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<5>> = 0.05 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
