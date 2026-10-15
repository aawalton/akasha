import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const resistantFlesh117883 = {
  id: "019e6f53-a618-7782-8d3b-ac0e37dd962b",
  type: "page-type/temper-skill",
  slug: "resistant-flesh-117883",
  title: "Resistant Flesh",
  key: "resistant-flesh-117883",
  baseName: "Render Flesh",
  description:
    "Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for |cffffff11321|r Health but applying Minor Defile to yourself for |cffffff4|r seconds, reducing your healing received and damage shield strength by |cffffff6|r%.\n\nYou grant the target Spell and Physical Resistance equal to half the amount healed for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_necromancer_013_a.dds",
  esoSkillId: 117883,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 1041,
  createdAt: "2026-05-28T16:03:33.528Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 6% (Constant)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
