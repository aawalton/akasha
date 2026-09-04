import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const arterialBurst38956 = {
  id: "019e6f53-9ec7-7d5e-ab8a-6c107c3ef211",
  pageTypeSlug: "temper-skill",
  slug: "arterial-burst-38956",
  title: "Arterial Burst",
  key: "arterial-burst-38956",
  baseName: "Eviscerate",
  description:
    '"Rend an enemy, dealing |cffffff8342|r Magic Damage and applying the Hemorrhaging status effect.\\n\\nDeals up to |cffffff33|r% more damage based on your missing Health.\\n\\nIf you use this ability while you are under |cffffff50|r% Health, it will always be a Critical Strike."',
  icon: "/esoui/art/icons/ability_u26_vampire_01_b.dds",
  esoSkillId: 38956,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
