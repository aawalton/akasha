import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vampiricDrain = {
  id: "019e6f53-a8a4-77d0-803c-29c9145c0939",
  pageTypeSlug: "temper-skill",
  slug: "vampiric-drain",
  title: "Vampiric Drain",
  key: "vampiric-drain",
  baseName: "Vampiric Drain",
  description:
    '"Siphon away your enemies\' vitality, dealing |cffffff3028|r Magic Damage and healing you for |cffffff26|r% of your missing Health every |cffffff1|r second for |cffffff3|r seconds.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_u26_vampire_03.dds",
  esoSkillId: 134583,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
