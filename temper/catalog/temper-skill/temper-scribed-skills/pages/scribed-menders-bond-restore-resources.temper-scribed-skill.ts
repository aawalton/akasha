import type { TemperScribedSkill } from "akasha/temper/catalog/temper-skill/temper-scribed-skills/temper-scribed-skill.page-type.types.ts"

export const scribedMendersBondRestoreResources = {
  id: "019e6471-15b2-7aab-b278-4d90fd0cb75e",
  type: "temper-scribed-skill",
  slug: "scribed-menders-bond-restore-resources",
  title: "Restorative Bond",
  key: "scribed-menders-bond-restore-resources",
  baseName: "Mender's Bond",
  description:
    "Restores 225 Magicka and 225 Stamina to the ally and other allies in the link every 1 second.",
  icon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  esoSkillId: 217319,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "restore-resources",
  grimoireId: "menders-bond",
} as const satisfies TemperScribedSkill
