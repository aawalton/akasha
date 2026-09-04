import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fossilize32685 = {
  id: "019e6f53-a23e-758d-b035-aff40af4866c",
  pageTypeSlug: "temper-skill",
  slug: "fossilize-32685",
  title: "Fossilize",
  key: "fossilize-32685",
  baseName: "Petrify",
  description:
    '"Encase an enemy in molten rock, reducing their movement speed by |cffffff50|r% for |cffffff1|r second. Upon completion, the target is stunned for |cffffff4|r seconds, or |cffffff8|r seconds against monsters. Immobilizes the target for |cffffff4|r seconds after the stun ends.\\n\\nThis stun cannot be blocked.\\n\\nThe molten rock melts through the enemy\'s armor and applies Minor Breach and Minor Vulnerability for |cffffff20|r seconds, reducing Armor by |cffffff2974|r and increasing damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_dragonknight_014_a.dds",
  esoSkillId: 32685,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
