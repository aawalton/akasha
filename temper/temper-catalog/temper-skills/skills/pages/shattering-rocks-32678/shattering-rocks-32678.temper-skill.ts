import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shatteringRocks32678 = {
  id: "019e6f53-a6ee-7edf-acb4-fb92731be620",
  pageTypeSlug: "temper-skill",
  slug: "shattering-rocks-32678",
  title: "Shattering Rocks",
  key: "shattering-rocks-32678",
  baseName: "Petrify",
  description:
    '"Encase an enemy in molten rock, reducing their movement speed by |cffffff50|r% for |cffffff1|r second. Upon completion, the target is stunned for |cffffff4|r seconds, or |cffffff8|r seconds against monsters. After the stun ends, the target takes |cffffff4796|r Flame Damage and you heal for |cffffff8679|r Health.\\n\\nThis stun cannot be blocked.\\n\\nThe molten rock melts through the enemy\'s armor and applies Minor Breach for |cffffff10|r seconds, reducing Armor by |cffffff2974|r."',
  icon: "/esoui/art/icons/ability_dragonknight_014b.dds",
  esoSkillId: 32678,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
