import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const streak = {
  id: "019e6245-a743-77b3-bc3c-aa455e48830e",
  type: "page-type/temper-skill",
  slug: "streak",
  title: "Streak",
  key: "streak",
  baseName: "Bolt Escape",
  description:
    "Transform yourself into pure energy and flash forward, dealing 1438 Shock Damage to enemies in your wake and stunning them for 3 seconds.\n\nThis effect cannot be blocked.\n\nCasting again within 4 seconds costs 33% more Magicka.",
  icon: "/esoui/art/icons/ability_sorcerer_streak.dds",
  esoSkillId: 30215,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 1275,
  createdAt: "2026-05-26T03:13:12.515Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06402534 MaxStat + 0.67226607 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Shock, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
