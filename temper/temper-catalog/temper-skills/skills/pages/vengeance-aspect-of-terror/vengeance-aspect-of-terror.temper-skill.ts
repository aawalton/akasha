import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceAspectOfTerror = {
  id: "019e6f53-a8b5-777c-8d75-db752ab239ea",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-aspect-of-terror",
  title: "Vengeance Aspect of Terror",
  key: "vengeance-aspect-of-terror",
  baseName: "Vengeance Aspect of Terror",
  description:
    '"Summon a dark spirit to terrify up to 3 nearby enemies, causing them to cower in fear for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_016.dds",
  esoSkillId: 237690,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-shadow",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-shadow",
} as const satisfies TemperSkill
