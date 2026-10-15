import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const curativeSurge186200 = {
  id: "019e6f53-a055-7fb6-abc0-0cca9bc92a34",
  type: "page-type/temper-skill",
  slug: "curative-surge-186200",
  title: "Curative Surge",
  key: "curative-surge-186200",
  baseName: "Remedy Cascade",
  description:
    "Channel the abyssal sea to coalesce a beam that heals you and your allies in its path for |cffffff36764|r Health over |cffffff4.5|r seconds.\n\nThe beam gradually grows stronger the longer you channel it, healing for up to |cffffff192|r% more at the end of its duration.\n\nConsume Crux to also restore |cffffff728|r Magicka and Stamina per Crux spent to your allies over |cffffff4.5|r seconds.",
  icon: "/esoui/art/icons/ability_arcanist_014_b.dds",
  esoSkillId: 186200,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 284,
  createdAt: "2026-05-28T16:03:32.053Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.038737 MaxStat + 0.406744 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, DOT, 4s duration, 0.333s tick, R2 = 1)",
    "<<2>> = 4.5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
