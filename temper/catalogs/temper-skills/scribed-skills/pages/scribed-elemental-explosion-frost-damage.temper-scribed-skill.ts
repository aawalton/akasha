import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedElementalExplosionFrostDamage = {
  id: "019e6471-15a5-7201-ba29-b51e948d085b",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-elemental-explosion-frost-damage",
  title: "Chilling Explosion",
  key: "scribed-elemental-explosion-frost-damage",
  baseName: "Elemental Explosion",
  description: "Deals 4009 Frost Damage to enemies.",
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
  focusScriptId: "frost-damage",
  grimoireId: "elemental-explosion",
} as const satisfies TemperScribedSkill
