import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedTravelingKnifeFrostDamage = {
  id: "019e6471-15dd-784f-a6a0-1e0f49004b9a",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-traveling-knife-frost-damage",
  title: "Chilling Knife",
  key: "scribed-traveling-knife-frost-damage",
  baseName: "Traveling Knife",
  description:
    "Deals 928 Magic Damage to an enemy and 1393 Frost Damage to enemies between you and them on return.",
  icon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
  esoSkillId: 50007007,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/frost-damage",
  grimoireId: "temper-grimoire/traveling-knife",
} as const satisfies TemperScribedSkill
