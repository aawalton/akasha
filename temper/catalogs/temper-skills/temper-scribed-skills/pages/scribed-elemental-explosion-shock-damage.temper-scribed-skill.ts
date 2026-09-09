import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionShockDamage = {
  id: "019e6471-15aa-752b-890d-0c2ed21df9b4",
  pageTypeSlug: "temper-scribed-skill",
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
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "shock-damage",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
