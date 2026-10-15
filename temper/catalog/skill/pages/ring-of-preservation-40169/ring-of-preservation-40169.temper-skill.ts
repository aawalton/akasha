import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ringOfPreservation40169 = {
  id: "019e6f53-a659-7065-8392-7896ac61eab2",
  type: "page-type/temper-skill",
  slug: "ring-of-preservation-40169",
  title: "Ring of Preservation",
  key: "ring-of-preservation-40169",
  baseName: "Circle of Protection",
  description:
    "Brand the earth at your location with a rune of protection for |cffffff10|r seconds. You and your allies in the area gain Minor Protection and Minor Endurance, reducing damage taken by |cffffff5|r% and increasing Stamina Recovery by |cffffff15|r%, and are healed for |cffffff1371|r Health every |cffffff1|r second.",
  icon: "/esoui/art/icons/ability_fightersguild_001_b.dds",
  esoSkillId: 40169,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1076,
  createdAt: "2026-05-28T16:03:33.593Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = Minor Protection (Constant)",
    "<<3>> = Minor Endurance (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 15% (Constant)",
    "<<6>> = 0.0187221 MaxStat + 0.197107 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Heal, AOE, Direct, 1s tick, R2 = 0.999998)",
    "<<7>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
