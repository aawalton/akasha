import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedElementalExplosionShockDamage = {
  id: "019e6471-15aa-752b-890d-0c2ed21df9b4",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-elemental-explosion-shock-damage",
  title: "Shocking Explosion",
  key: "scribed-elemental-explosion-shock-damage",
  baseName: "Elemental Explosion",
  description: "Deals 4009 Shock Damage to enemies.",
  icon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  esoSkillId: 217228,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/shock-damage",
  grimoireId: "temper-grimoire/elemental-explosion",
} as const satisfies TemperScribedSkill
