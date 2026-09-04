import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedMendersBondGenerateUltimate = {
  id: "019e6471-15ae-71fb-8f1a-02628563bf2a",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-menders-bond-generate-ultimate",
  title: "Heroic Bond",
  key: "scribed-menders-bond-generate-ultimate",
  baseName: "Mender's Bond",
  description: "Transfers 1 Ultimate from you to the ally every 1 second.",
  icon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  esoSkillId: 217294,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "generate-ultimate",
  grimoireId: "menders-bond",
} as const satisfies TemperScribedSkill
