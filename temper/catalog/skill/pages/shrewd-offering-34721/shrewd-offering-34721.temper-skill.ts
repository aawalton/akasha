import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shrewdOffering34721 = {
  id: "019e6f53-a70d-72fa-8f22-7a0fd4ac12a2",
  type: "page-type/temper-skill",
  slug: "shrewd-offering-34721",
  title: "Shrewd Offering",
  key: "shrewd-offering-34721",
  baseName: "Malevolent Offering",
  description:
    "Pour out your lifesblood and channel the arcane, healing yourself or an ally in front of you for |cffffff10960|r Health, while draining |cffffff810|r Health from yourself over |cffffff2|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_011_b.dds",
  esoSkillId: 34721,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1178,
  createdAt: "2026-05-28T16:03:33.773Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 810 (Constant)",
    "<<3>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
