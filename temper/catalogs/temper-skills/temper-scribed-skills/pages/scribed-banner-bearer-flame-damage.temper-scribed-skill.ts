import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedBannerBearerFlameDamage = {
  id: "019e6471-1593-71e7-bf1c-6c4c66075b4a",
  pageTypeSlug: "temper-scribed-skill",
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
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "flame-damage",
  grimoireId: "banner-bearer",
} as const satisfies TemperScribedSkill
