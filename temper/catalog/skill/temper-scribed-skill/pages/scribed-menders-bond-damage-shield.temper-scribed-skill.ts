import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedMendersBondDamageShield = {
  id: "019e6471-15ad-7273-b0ad-4215c46dffa5",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-menders-bond-damage-shield",
  title: "Warding Bond",
  key: "scribed-menders-bond-damage-shield",
  baseName: "Mender's Bond",
  description:
    "Grants the ally and other allies in the link a damage shield that absorbs 667 damage every 1 second.",
  icon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  esoSkillId: 217320,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/damage-shield",
  grimoireId: "temper-grimoire/menders-bond",
} as const satisfies TemperScribedSkill
