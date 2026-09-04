import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedMendersBondHealing = {
  id: "019e6471-15af-7050-a5eb-29c73ae0bf7e",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-menders-bond-healing",
  title: "Healing Bond",
  key: "scribed-menders-bond-healing",
  baseName: "Mender's Bond",
  description: "Heals the ally and other allies in the link for 375 Health every 1 second.",
  icon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  esoSkillId: 217318,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "healing",
  grimoireId: "menders-bond",
} as const satisfies TemperScribedSkill
