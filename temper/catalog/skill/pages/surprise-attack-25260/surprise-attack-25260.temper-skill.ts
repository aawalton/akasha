import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const surpriseAttack25260 = {
  id: "019e6f53-a7fe-7624-b612-03bd7af30f55",
  type: "page-type/temper-skill",
  slug: "surprise-attack-25260",
  title: "Surprise Attack",
  key: "surprise-attack-25260",
  baseName: "Veiled Strike",
  description:
    "Slash an enemy, dealing |cffffff8342|r Physical Damage and applying the Sundered status effect.\n\nIf you strike an enemy from their flank you set them Off Balance. This attack will also be guaranteed to be a Critical Strike, up to once every |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_002_a.dds",
  esoSkillId: 25260,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 1310,
  createdAt: "2026-05-28T16:03:34.014Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
