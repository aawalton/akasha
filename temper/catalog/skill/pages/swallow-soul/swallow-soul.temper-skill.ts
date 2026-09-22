import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const swallowSoul = {
  id: "019e6245-a74e-72ea-a204-48d76c1b1681",
  type: "page-type/temper-skill",
  slug: "swallow-soul",
  title: "Swallow Soul",
  key: "swallow-soul",
  baseName: "Strife",
  description:
    '"Steal an enemy\'s life force, dealing 2160 Magic Damage and healing you for 35% of the damage inflicted every 2 seconds for 10 seconds."',
  icon: "/esoui/art/icons/ability_nightblade_012_a.dds",
  esoSkillId: 35949,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
