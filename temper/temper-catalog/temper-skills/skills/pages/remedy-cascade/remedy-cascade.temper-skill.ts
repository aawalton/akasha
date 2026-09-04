import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const remedyCascade = {
  id: "019e6f53-a5e8-7ae1-8fae-6e5f9d206ce7",
  pageTypeSlug: "temper-skill",
  slug: "remedy-cascade",
  title: "Remedy Cascade",
  key: "remedy-cascade",
  baseName: "Remedy Cascade",
  description:
    '"Channel the abyssal sea to coalesce a beam of restorative energy. The beam heals you and your allies in its path for |cffffff35607|r Health over |cffffff4.5|r seconds.\\n\\nConsume Crux to also restore |cffffff728|r Magicka and Stamina per Crux spent to your allies over |cffffff4.5|r seconds."',
  icon: "/esoui/art/icons/ability_arcanist_014.dds",
  esoSkillId: 183537,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
