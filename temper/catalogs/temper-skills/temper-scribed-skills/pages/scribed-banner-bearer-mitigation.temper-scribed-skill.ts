import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedBannerBearerMitigation = {
  id: "019e6471-1599-7aee-8184-eb3fb05407c2",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-banner-bearer-mitigation",
  title: "Fortifying Banner",
  key: "scribed-banner-bearer-mitigation",
  baseName: "Banner Bearer",
  description: "Reduces damage taken by 6%.",
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
  focusScriptId: "mitigation",
  grimoireId: "banner-bearer",
} as const satisfies TemperScribedSkill
