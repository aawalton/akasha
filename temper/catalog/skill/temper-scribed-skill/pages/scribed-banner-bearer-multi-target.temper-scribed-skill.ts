import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedBannerBearerMultiTarget = {
  id: "019e6471-159b-78eb-bd7b-bee179530341",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-banner-bearer-multi-target",
  title: "Shattering Banner",
  key: "scribed-banner-bearer-multi-target",
  baseName: "Banner Bearer",
  description: "Increases damage done with area of effect attacks by 6%.",
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
  focusScriptId: "temper-focus-script/multi-target",
  grimoireId: "temper-grimoire/banner-bearer",
} as const satisfies TemperScribedSkill
