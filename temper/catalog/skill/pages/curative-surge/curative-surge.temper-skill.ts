import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const curativeSurge = {
  id: "019e6245-a62e-7ece-8f2b-018d83f6b09d",
  type: "page-type/temper-skill",
  slug: "curative-surge",
  title: "Curative Surge",
  key: "curative-surge",
  baseName: "Remedy Cascade",
  description:
    "Channel the abyssal sea to coalesce a beam that heals you and your allies in its path for 11674 Health over 4.5 seconds.\n\nThe beam gradually grows stronger the longer you channel it, healing for up to 192% more at the end of its duration.\n\nConsume Crux to also restore 728 Magicka and Stamina per Crux spent to your allies over 4.5 seconds.",
  icon: "/esoui/art/icons/ability_arcanist_014_b.dds",
  esoSkillId: 40186200,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 283,
  createdAt: "2026-05-26T03:13:12.238Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.040015321 MaxStat + 0.420166552 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, DOT, 4s duration, 0.333s tick, R2 = 1)",
    "<<2>> = 4.5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
