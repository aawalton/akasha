import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const inevitableDetonation = {
  id: "019e6251-4cc7-78cf-8965-d3f9d5ed26e8",
  type: "page-type/temper-skill",
  slug: "inevitable-detonation",
  title: "Inevitable Detonation",
  key: "inevitable-detonation",
  baseName: "Magicka Detonation",
  description:
    "Curse an enemy with a magical bomb that explodes after 4 seconds, dealing 449 Magic Damage to all enemies in the area.\n\nIf the bomb is dispelled or removed early, the explosion is triggered immediately.\n\nEach enemy within the bomb's radius increases the damage by 100%.",
  icon: "/esoui/art/icons/ability_ava_inevitable_detonation.dds",
  esoSkillId: 63293,
  isMorph: true,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 680,
  createdAt: "2026-05-26T03:25:55.783Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 0.020008177 MaxStat + 0.210083276 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 100% (Constant)",
  ],
} as const satisfies TemperSkill
