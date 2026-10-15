import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const suppressionField28341 = {
  id: "019e6f53-a7f9-74bc-85a8-4e813bedd01a",
  type: "page-type/temper-skill",
  slug: "suppression-field-28341",
  title: "Suppression Field",
  key: "suppression-field-28341",
  baseName: "Negate Magic",
  description:
    "Create a globe of magic suppression for |cffffff12|r seconds, removing and preventing all enemy area of effect abilities from occurring in the area.\n\nEnemies within the globe are stunned, while enemy players will be silenced rather than stunned.\n\nThe globe also damages enemies for |cffffff3609|r Magic Damage every |cffffff1|r second.",
  icon: "/esoui/art/icons/ability_sorcerer_crushing_monsoon.dds",
  esoSkillId: 28341,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1307,
  createdAt: "2026-05-28T16:03:34.009Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 12 seconds (Constant)",
    "<<2>> = 0.0446504 MaxStat + 0.469231 MaxPower - 0.121725 (Ultimate, ratio = 10.51, Dmg, Magic, AOE, DOT, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
