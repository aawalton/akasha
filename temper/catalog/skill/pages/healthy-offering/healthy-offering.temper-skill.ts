import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const healthyOffering = {
  id: "019e6245-a6a1-7e8b-a8ae-8556282f4e6b",
  type: "page-type/temper-skill",
  slug: "healthy-offering",
  title: "Healthy Offering",
  key: "healthy-offering",
  baseName: "Malevolent Offering",
  description:
    "Pour out your lifesblood and channel the arcane, healing yourself or an ally in front of you for 3600 Health, while draining 1080 Health from yourself over 3 seconds.\n\nAfter casting, gain Minor Mending for 10 seconds, increasing your healing done by 8%.",
  icon: "/esoui/art/icons/ability_nightblade_011_a.dds",
  esoSkillId: 36144,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 615,
  createdAt: "2026-05-26T03:13:12.353Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.16006335 MaxStat + 1.68067034 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 1080 (Constant)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 8% (Constant)",
  ],
} as const satisfies TemperSkill
