import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedBannerBearerImmobilize = {
  id: "019e6471-1595-79a0-931e-a2b50195b8b9",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-banner-bearer-immobilize",
  title: "Binding Banner",
  key: "scribed-banner-bearer-immobilize",
  baseName: "Banner Bearer",
  description:
    "You cleanse yourself of snares and immobilizations and are immune to them while the banner is active.",
  icon: "/esoui/art/icons/ability_grimoire_support.dds",
  esoSkillId: 230289,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-support",
  skillType: "temper-skill-type/active",
  subcategoryId: "scribed",
  focusScriptId: "temper-focus-script/immobilize",
  grimoireId: "banner-bearer",
} as const satisfies TemperScribedSkill
