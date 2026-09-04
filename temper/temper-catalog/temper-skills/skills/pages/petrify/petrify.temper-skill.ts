import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const petrify = {
  id: "019e6f53-a4f7-7e16-905a-62ec327f4067",
  pageTypeSlug: "temper-skill",
  slug: "petrify",
  title: "Petrify",
  key: "petrify",
  baseName: "Petrify",
  description:
    '"Encase an enemy in molten rock, reducing their movement speed by |cffffff50|r% for |cffffff1|r second. Upon completion, the target is stunned for |cffffff4|r seconds, or |cffffff8|r seconds against monsters.\\n\\nThis stun cannot be blocked.\\n\\nThe molten rock melts through the enemy\'s armor and applies Minor Breach for |cffffff10|r seconds, reducing Armor by |cffffff2974|r."',
  icon: "/esoui/art/icons/ability_dragonknight_014.dds",
  esoSkillId: 29037,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
