import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ringOfPreservation = {
  id: "019e6238-c304-70c5-b39d-c2179391c1af",
  type: "page-type/temper-skill",
  slug: "ring-of-preservation",
  title: "Ring of Preservation",
  key: "ring-of-preservation",
  baseName: "Circle of Protection",
  description:
    "Brand the earth at your location with a rune of protection for 10 seconds. You and your allies in the area gain Minor Protection and Minor Endurance, reducing damage taken by 5% and increasing Stamina Recovery by 15%, and are healed for 435 Health every 1 second.",
  icon: "/esoui/art/icons/ability_fightersguild_001_b.dds",
  esoSkillId: 42548,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1075,
  createdAt: "2026-05-26T02:59:07.652Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = Minor Protection (Constant)",
    "<<3>> = Minor Endurance (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 15% (Constant)",
    "<<6>> = 0.0193549 MaxStat + 0.203761 MaxPower - 1.01347 (Ultimate, ratio = 10.53, Heal, AOE, Direct, 1s tick, R2 = 0.999997)",
    "<<7>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
