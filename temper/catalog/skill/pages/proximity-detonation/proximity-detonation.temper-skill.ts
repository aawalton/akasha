import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const proximityDetonation = {
  id: "019e6251-4cd9-748a-b649-340b77b0635d",
  type: "page-type/temper-skill",
  slug: "proximity-detonation",
  title: "Proximity Detonation",
  key: "proximity-detonation",
  baseName: "Magicka Detonation",
  description:
    "Activate a magical bomb on yourself that explodes after 8 seconds, dealing 449 Magic Damage to all enemies in the area.\n\nEach enemy within the bomb's radius increases the damage by 100%, including the original target.",
  icon: "/esoui/art/icons/ability_ava_proximity_detonation.dds",
  esoSkillId: 63302,
  isMorph: true,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 935,
  createdAt: "2026-05-26T03:25:55.801Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 8 seconds (Constant)",
    "<<2>> = 0.020008177 MaxStat + 0.210083276 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 100% (Constant)",
  ],
} as const satisfies TemperSkill
