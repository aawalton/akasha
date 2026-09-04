import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const defensiveRune = {
  id: "019e6245-a64f-7846-8263-d944e7bc09cb",
  pageTypeSlug: "temper-skill",
  slug: "defensive-rune",
  title: "Defensive Rune",
  key: "defensive-rune",
  baseName: "Rune Prison",
  description:
    '"Place a rune of protection on yourself for 2 minutes. While active, the next enemy to attack you is imprisoned in a constricting sphere of dark magic, stunning them after a short delay for 3 seconds.\\n\\nThis stun cannot be blocked."',
  icon: "/esoui/art/icons/ability_sorcerer_weakening_fog.dds",
  esoSkillId: 30194,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
