import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const swallowSoul = {
  id: "019e6245-a74e-72ea-a204-48d76c1b1681",
  type: "page-type/temper-skill",
  slug: "swallow-soul",
  title: "Swallow Soul",
  key: "swallow-soul",
  baseName: "Strife",
  description:
    "Steal an enemy's life force, dealing 2160 Magic Damage and healing you for 35% of the damage inflicted every 2 seconds for 10 seconds.",
  icon: "/esoui/art/icons/ability_nightblade_012_a.dds",
  esoSkillId: 35949,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1311,
  createdAt: "2026-05-26T03:13:12.526Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.124831852 MaxStat + 1.30079492 MaxPower - 32.0056456 (Ultimate, ratio = 10.42, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, Melee, 0.5s duration, R2 = 0.99113)",
    "<<2>> = 33 (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 1% (Constant)",
    "<<6>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
