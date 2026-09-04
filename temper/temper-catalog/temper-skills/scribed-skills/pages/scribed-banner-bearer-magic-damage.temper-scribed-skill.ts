import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedBannerBearerMagicDamage = {
  id: "019e6471-1597-7bbe-bd05-657fd2905a91",
  pageTypeSlug: "temper-scribed-skill",
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
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "magic-damage",
  grimoireId: "banner-bearer",
} as const satisfies TemperScribedSkill
