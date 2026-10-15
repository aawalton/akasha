import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const remedyCascade = {
  id: "019e6f53-a5e8-7ae1-8fae-6e5f9d206ce7",
  type: "page-type/temper-skill",
  slug: "remedy-cascade",
  title: "Remedy Cascade",
  key: "remedy-cascade",
  baseName: "Remedy Cascade",
  description:
    "Channel the abyssal sea to coalesce a beam of restorative energy. The beam heals you and your allies in its path for |cffffff35607|r Health over |cffffff4.5|r seconds.\n\nConsume Crux to also restore |cffffff728|r Magicka and Stamina per Crux spent to your allies over |cffffff4.5|r seconds.",
  icon: "/esoui/art/icons/ability_arcanist_014.dds",
  esoSkillId: 183537,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 1015,
  createdAt: "2026-05-28T16:03:33.480Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0375 MaxStat + 0.39375 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, DOT, 4s duration, 0.333s tick, R2 = 1)",
    "<<2>> = 4.5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
