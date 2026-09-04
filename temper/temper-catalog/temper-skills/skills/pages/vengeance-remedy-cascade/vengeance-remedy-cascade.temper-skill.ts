import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRemedyCascade = {
  id: "019e6f53-a962-77ff-a81f-f8b4b7ea73e1",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-remedy-cascade",
  title: "Vengeance Remedy Cascade",
  key: "vengeance-remedy-cascade",
  baseName: "Vengeance Remedy Cascade",
  description:
    '"Channel the abyssal sea to coalesce a beam of restorative energy. The beam heals you or up to 3 allies in its path for |cffffff44976|r Health over |cffffff4.5|r seconds.\\n\\nConsume Crux to also restore |cffffff672|r Magicka and Stamina per Crux spent to your allies over |cffffff4.5|r seconds."',
  icon: "/esoui/art/icons/ability_arcanist_014.dds",
  esoSkillId: 238482,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-curative-runeforms",
} as const satisfies TemperSkill
