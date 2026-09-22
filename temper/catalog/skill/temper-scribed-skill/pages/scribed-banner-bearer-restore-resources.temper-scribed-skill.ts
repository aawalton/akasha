import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedBannerBearerRestoreResources = {
  id: "019e6471-159f-7589-8387-0ebe410bb8a3",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-banner-bearer-restore-resources",
  title: "Restorative Banner",
  key: "scribed-banner-bearer-restore-resources",
  baseName: "Banner Bearer",
  description: "Reduces the cost of non-Ultimate abilities by 8%.",
  icon: "/esoui/art/icons/ability_grimoire_support.dds",
  esoSkillId: 217699,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/restore-resources",
  grimoireId: "temper-grimoire/banner-bearer",
} as const satisfies TemperScribedSkill
