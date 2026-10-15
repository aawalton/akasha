import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const venomSkull = {
  id: "019e6245-a761-73c9-87da-42524cdef78a",
  type: "page-type/temper-skill",
  slug: "venom-skull",
  title: "Venom Skull",
  key: "venom-skull",
  baseName: "Flame Skull",
  description:
    "Lob an explosive skull at an enemy, dealing 2160 Poison Damage.\n\nEvery third cast of this ability deals 50% increased damage and creates a corpse near the enemy, up to once every 3 seconds.\n\nWhile slotted, casting any Necromancer ability while you are in combat will count towards the third cast.",
  icon: "/esoui/art/icons/ability_necromancer_001_a.dds",
  esoSkillId: 40117624,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 1594,
  createdAt: "2026-05-26T03:13:12.545Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.09603801 MaxStat + 1.00840427 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Poison, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
