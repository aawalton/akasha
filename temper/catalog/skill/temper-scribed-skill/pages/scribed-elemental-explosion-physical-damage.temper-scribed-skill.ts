import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedElementalExplosionPhysicalDamage = {
  id: "019e6471-15a9-74d5-9de5-94bfb07902bc",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-elemental-explosion-physical-damage",
  title: "Sundering Explosion",
  key: "scribed-elemental-explosion-physical-damage",
  baseName: "Elemental Explosion",
  description: "Deals 4009 Physical Damage to enemies.",
  icon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  esoSkillId: 229857,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/physical-damage",
  grimoireId: "temper-grimoire/elemental-explosion",
} as const satisfies TemperScribedSkill
