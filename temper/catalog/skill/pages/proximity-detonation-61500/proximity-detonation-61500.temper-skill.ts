import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const proximityDetonation61500 = {
  id: "019e6f53-a552-7092-a00d-9c2fcabcd5a8",
  type: "page-type/temper-skill",
  slug: "proximity-detonation-61500",
  title: "Proximity Detonation",
  key: "proximity-detonation-61500",
  baseName: "Magicka Detonation",
  description:
    "Activate a magical bomb on yourself that explodes after |cffffff8|r seconds, dealing |cffffff1652|r Magic Damage to all enemies in the area.\n\nEach enemy within the bomb's radius increases the damage by |cffffff100|r%, including the original target.",
  icon: "/esoui/art/icons/ability_ava_proximity_detonation.dds",
  esoSkillId: 61500,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 2,
  rank: 7,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 936,
  createdAt: "2026-05-28T16:03:33.330Z",
  updatedAt: "2026-10-21T03:53:31.433Z",
  equations: [
    "<<1>> = 8 seconds (Constant)",
    "<<2>> = 0.019979672 MaxStat + 0.20978655 MaxPower (Ultimate, RankMod(1), Dmg, Magic, AOE, Direct, Melee)",
    "<<3>> = 100% (Constant)",
  ],
} as const satisfies TemperSkill
