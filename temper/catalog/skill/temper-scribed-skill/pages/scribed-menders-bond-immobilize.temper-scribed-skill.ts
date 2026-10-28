import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedMendersBondImmobilize = {
  id: "019e6471-15af-7e1c-b7dd-f17a36d726cf",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-menders-bond-immobilize",
  title: "Binding Bond",
  key: "scribed-menders-bond-immobilize",
  baseName: "Mender's Bond",
  description:
    "Removes and grants immunity to snares and immobilizations for 1 second to the ally and other allies in the link.",
  icon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  esoAbilityId: 217257,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/immobilize",
  grimoireId: "temper-grimoire/menders-bond",
  hashPlace: 1656,
  createdAt: "2026-05-26T13:19:53.263Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill
