import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRegeneration = {
  id: "019e6f53-a961-7196-9081-f2c598af86c4",
  type: "page-type/temper-skill",
  slug: "vengeance-regeneration",
  title: "Vengeance Regeneration",
  key: "vengeance-regeneration",
  baseName: "Vengeance Regeneration",
  description:
    '"Share your staff\'s life-giving energy, healing you or a nearby ally for |cffffff26024|r Health over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_002.dds",
  esoSkillId: 241521,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-restoration-staff",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
