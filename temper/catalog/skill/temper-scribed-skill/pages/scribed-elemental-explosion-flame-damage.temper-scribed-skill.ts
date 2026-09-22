import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedElementalExplosionFlameDamage = {
  id: "019e6471-15a3-7b2f-b556-a3f367c549d7",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-elemental-explosion-flame-damage",
  title: "Fiery Explosion",
  key: "scribed-elemental-explosion-flame-damage",
  baseName: "Elemental Explosion",
  description: "Deals 4009 Flame Damage to enemies.",
  icon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  esoSkillId: 217228,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  subcategoryId: "scribed",
  focusScriptId: "temper-focus-script/flame-damage",
  grimoireId: "temper-grimoire/elemental-explosion",
} as const satisfies TemperScribedSkill
