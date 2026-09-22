import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const suppressionField28341 = {
  id: "019e6f53-a7f9-74bc-85a8-4e813bedd01a",
  type: "page-type/temper-skill",
  slug: "suppression-field-28341",
  title: "Suppression Field",
  key: "suppression-field-28341",
  baseName: "Negate Magic",
  description:
    '"Create a globe of magic suppression for |cffffff12|r seconds, removing and preventing all enemy area of effect abilities from occurring in the area.\\n\\nEnemies within the globe are stunned, while enemy players will be silenced rather than stunned.\\n\\nThe globe also damages enemies for |cffffff3609|r Magic Damage every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_sorcerer_crushing_monsoon.dds",
  esoSkillId: 28341,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/ultimate",
} as const satisfies TemperSkill
