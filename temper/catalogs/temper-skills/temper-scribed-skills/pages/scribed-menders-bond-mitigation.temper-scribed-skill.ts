import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedMendersBondMitigation = {
  id: "019e6471-15b1-7af7-91cb-9a1f93da475b",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-menders-bond-mitigation",
  title: "Fortifying Bond",
  key: "scribed-menders-bond-mitigation",
  baseName: "Mender's Bond",
  description:
    "Transfers 10% of the damage the allied player or companions and other allied players or companions in the link take to you.",
  icon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  esoSkillId: 220747,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "mitigation",
  grimoireId: "menders-bond",
} as const satisfies TemperScribedSkill
