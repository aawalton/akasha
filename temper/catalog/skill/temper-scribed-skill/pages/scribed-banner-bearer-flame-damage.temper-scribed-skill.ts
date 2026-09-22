import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedBannerBearerFlameDamage = {
  id: "019e6471-1593-71e7-bf1c-6c4c66075b4a",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-banner-bearer-flame-damage",
  title: "Fiery Banner",
  key: "scribed-banner-bearer-flame-damage",
  baseName: "Banner Bearer",
  description: "Increases damage done with damage over time effects by 6%.",
  icon: "/esoui/art/icons/ability_grimoire_support.dds",
  esoSkillId: 217699,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-support",
  skillType: "temper-skill-type/active",
  subcategoryId: "scribed",
  focusScriptId: "temper-focus-script/flame-damage",
  grimoireId: "temper-grimoire/banner-bearer",
} as const satisfies TemperScribedSkill
