import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedBannerBearerPhysicalDamage = {
  id: "019e6471-159d-7dc5-b1b0-e2a913419032",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-banner-bearer-physical-damage",
  title: "Sundering Banner",
  key: "scribed-banner-bearer-physical-damage",
  baseName: "Banner Bearer",
  description: "Increases Martial damage done by 6%.",
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
  focusScriptId: "physical-damage",
  grimoireId: "banner-bearer",
} as const satisfies TemperScribedSkill
