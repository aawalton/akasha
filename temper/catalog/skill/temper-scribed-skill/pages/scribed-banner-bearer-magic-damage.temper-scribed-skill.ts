import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedBannerBearerMagicDamage = {
  id: "019e6471-1597-7bbe-bd05-657fd2905a91",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-banner-bearer-magic-damage",
  title: "Magical Banner",
  key: "scribed-banner-bearer-magic-damage",
  baseName: "Banner Bearer",
  description: "Increases Magical damage done by 6%.",
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
  focusScriptId: "temper-focus-script/magic-damage",
  grimoireId: "banner-bearer",
} as const satisfies TemperScribedSkill
