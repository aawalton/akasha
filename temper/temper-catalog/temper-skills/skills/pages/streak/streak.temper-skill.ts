import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const streak = {
  id: "019e6245-a743-77b3-bc3c-aa455e48830e",
  pageTypeSlug: "temper-skill",
  slug: "streak",
  title: "Streak",
  key: "streak",
  baseName: "Bolt Escape",
  description:
    '"Transform yourself into pure energy and flash forward, dealing 1438 Shock Damage to enemies in your wake and stunning them for 3 seconds.\\n\\nThis effect cannot be blocked.\\n\\nCasting again within 4 seconds costs 33% more Magicka."',
  icon: "/esoui/art/icons/ability_sorcerer_streak.dds",
  esoSkillId: 30215,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
