import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRunePrison = {
  id: "019e6f53-a96d-7e1c-9a4d-9d9abd8e07be",
  type: "page-type/temper-skill",
  slug: "vengeance-rune-prison",
  title: "Vengeance Rune Prison",
  key: "vengeance-rune-prison",
  baseName: "Vengeance Rune Prison",
  description:
    '"Imprison an enemy in a constricting sphere of dark magic. After a short duration they are stunned for |cffffff3|r seconds.\\n\\nThis stun cannot be blocked."',
  icon: "/esoui/art/icons/ability_sorcerer_dark_fog.dds",
  esoSkillId: 237803,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
