import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const magickaDetonation = {
  id: "019e6f53-a43c-75f8-9413-20a3a0895069",
  type: "page-type/temper-skill",
  slug: "magicka-detonation",
  title: "Magicka Detonation",
  key: "magicka-detonation",
  baseName: "Magicka Detonation",
  description:
    "Curse an enemy with a magical bomb that explodes after |cffffff4|r seconds, dealing |cffffff1599|r Magic Damage to all enemies in the area.\n\nEach enemy within the bomb's radius increases the damage by |cffffff100|r%, including the original target.",
  icon: "/esoui/art/icons/ability_ava_magicka_detonation.dds",
  esoSkillId: 61487,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 7,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 788,
  createdAt: "2026-05-28T16:03:33.052Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 0.01875 MaxStat + 0.196875 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 100% (Constant)",
  ],
} as const satisfies TemperSkill
