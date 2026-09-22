import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedElementalExplosionKnockback = {
  id: "019e6471-15a6-790d-b568-6f6a40c84b90",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-elemental-explosion-knockback",
  title: "Repelling Explosion",
  key: "scribed-elemental-explosion-knockback",
  baseName: "Elemental Explosion",
  description: "Knocks enemies back 10 meters.",
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
  focusScriptId: "temper-focus-script/knockback",
  grimoireId: "temper-grimoire/elemental-explosion",
} as const satisfies TemperScribedSkill
