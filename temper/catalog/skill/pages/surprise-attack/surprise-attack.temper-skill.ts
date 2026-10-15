import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const surpriseAttack = {
  id: "019e6245-a74d-71df-8b2a-1692fa278e42",
  type: "page-type/temper-skill",
  slug: "surprise-attack",
  title: "Surprise Attack",
  key: "surprise-attack",
  baseName: "Veiled Strike",
  description:
    "Slash an enemy, dealing 2399 Physical Damage and applying the Sundered status effect.\n\nIf you strike an enemy from their flank you set them Off Balance. This attack will also be guaranteed to be a Critical Strike, up to once every 3 seconds.",
  icon: "/esoui/art/icons/ability_nightblade_002_a.dds",
  esoSkillId: 36234,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 1309,
  createdAt: "2026-05-26T03:13:12.525Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1067089 MaxStat + 1.12044345 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
