import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const streak23236 = {
  id: "019e6f53-a7c2-7011-82fd-868a6d9982f3",
  type: "page-type/temper-skill",
  slug: "streak-23236",
  title: "Streak",
  key: "streak-23236",
  baseName: "Bolt Escape",
  description:
    "Transform yourself into pure energy and flash forward, dealing |cffffff5288|r Shock Damage to enemies in your wake and stunning them for |cffffff3|r seconds.\n\nThis effect cannot be blocked.\n\nCasting again within |cffffff4|r seconds costs |cffffff33|r% more Magicka.",
  icon: "/esoui/art/icons/ability_sorcerer_streak.dds",
  esoSkillId: 23236,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 1276,
  createdAt: "2026-05-28T16:03:33.954Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Shock, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
