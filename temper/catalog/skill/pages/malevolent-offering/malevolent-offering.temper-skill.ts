import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const malevolentOffering = {
  id: "019e6f53-a450-7937-b429-2856016c2897",
  type: "page-type/temper-skill",
  slug: "malevolent-offering",
  title: "Malevolent Offering",
  key: "malevolent-offering",
  baseName: "Malevolent Offering",
  description:
    "Pour out your lifesblood and channel the arcane, healing yourself or an ally in front of you for |cffffff10960|r Health, while draining |cffffff1080|r Health from yourself over |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_011.dds",
  esoSkillId: 33308,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 798,
  createdAt: "2026-05-28T16:03:33.072Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15 MaxStat + 1.575 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 1080 (Constant)",
    "<<3>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
