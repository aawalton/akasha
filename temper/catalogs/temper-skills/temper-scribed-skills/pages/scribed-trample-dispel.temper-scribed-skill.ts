import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTrampleDispel = {
  id: "019e6471-15d5-7ebc-9ebb-35e1eef27cde",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-trample-dispel",
  title: "Dispelling Trample",
  key: "scribed-trample-dispel",
  baseName: "Trample",
  description:
    "Deals 1438 Physical Damage to all enemies. Removes up to 1 damage shield effect from enemy players.",
  icon: "/esoui/art/icons/ability_grimoire_assault.dds",
  esoSkillId: 217663,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "dispel",
  grimoireId: "trample",
} as const satisfies TemperScribedSkill
