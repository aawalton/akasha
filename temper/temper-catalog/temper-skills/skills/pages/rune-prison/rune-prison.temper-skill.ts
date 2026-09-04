import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runePrison = {
  id: "019e6f53-a688-7998-b8cb-7280b26aa503",
  pageTypeSlug: "temper-skill",
  slug: "rune-prison",
  title: "Rune Prison",
  key: "rune-prison",
  baseName: "Rune Prison",
  description:
    '"Imprison an enemy in a constricting sphere of dark magic. After a short duration they are stunned for |cffffff3|r seconds.\\n\\nThis stun cannot be blocked."',
  icon: "/esoui/art/icons/ability_sorcerer_dark_fog.dds",
  esoSkillId: 24371,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
