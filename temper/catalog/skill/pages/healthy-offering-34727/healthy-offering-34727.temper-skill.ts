import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const healthyOffering34727 = {
  id: "019e6f53-a2f7-77ec-9796-ff62c1bff59c",
  type: "page-type/temper-skill",
  slug: "healthy-offering-34727",
  title: "Healthy Offering",
  key: "healthy-offering-34727",
  baseName: "Malevolent Offering",
  description:
    "Pour out your lifesblood and channel the arcane, healing yourself or an ally in front of you for |cffffff11321|r Health, while draining |cffffff1080|r Health from yourself over |cffffff3|r seconds.\n\nAfter casting, gain Minor Mending for |cffffff10|r seconds, increasing your healing done by |cffffff8|r%.",
  icon: "/esoui/art/icons/ability_nightblade_011_a.dds",
  esoSkillId: 34727,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 616,
  createdAt: "2026-05-28T16:03:32.727Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 1080 (Constant)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 8% (Constant)",
  ],
} as const satisfies TemperSkill
