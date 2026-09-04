import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonChargedAtronach23495 = {
  id: "019e6f53-a7da-7d64-9d94-912a119cd2ab",
  pageTypeSlug: "temper-skill",
  slug: "summon-charged-atronach-23495",
  title: "Summon Charged Atronach",
  key: "summon-charged-atronach-23495",
  baseName: "Summon Storm Atronach",
  description:
    '"Summon an immobile storm atronach at the target location. Its arrival deals |cffffff8533|r Shock Damage and stuns enemies for |cffffff3|r seconds. The atronach calls upon a lightning storm every |cffffff2|r seconds, dealing |cffffff8533|r Shock Damage to enemies around it. \\n\\nEnemies hit are afflicted with the Concussion status effect.\\n\\nAn ally near the atronach can activate the Charged Lightning synergy, granting nearby allies Major Berserk for |cffffff10|r seconds, increasing their damage done by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_endless_atronachs.dds",
  esoSkillId: 23495,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "ultimate",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
