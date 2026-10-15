import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const resistantFlesh = {
  id: "019e6245-a70d-7b81-826f-6aa954b6837c",
  type: "page-type/temper-skill",
  slug: "resistant-flesh",
  title: "Resistant Flesh",
  key: "resistant-flesh",
  baseName: "Render Flesh",
  description:
    "Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for 3600 Health but applying Minor Defile to yourself for 4 seconds, reducing your healing received and damage shield strength by 6%.\n\nYou grant the target Spell and Physical Resistance equal to half the amount healed for 3 seconds.",
  icon: "/esoui/art/icons/ability_necromancer_013_a.dds",
  esoSkillId: 40117883,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 1040,
  createdAt: "2026-05-26T03:13:12.461Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.16006335 MaxStat + 1.68067034 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 6% (Constant)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
