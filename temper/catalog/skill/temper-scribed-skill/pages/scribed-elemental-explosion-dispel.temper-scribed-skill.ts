import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedElementalExplosionDispel = {
  id: "019e6471-15a2-73dc-b5c8-edd4e0508113",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-elemental-explosion-dispel",
  title: "Dispelling Explosion",
  key: "scribed-elemental-explosion-dispel",
  baseName: "Elemental Explosion",
  description: "Removes up to 3 enemy area effect abilities.",
  icon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  esoSkillId: 217237,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/dispel",
  grimoireId: "temper-grimoire/elemental-explosion",
} as const satisfies TemperScribedSkill
