import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const magnumShot = {
  id: "019e6226-00ff-7d48-832b-daf9f71a08cc",
  type: "page-type/temper-skill",
  slug: "magnum-shot",
  title: "Magnum Shot",
  key: "magnum-shot",
  baseName: "Scatter Shot",
  description:
    "Blast an enemy with an explosive arrow, dealing 1727 Physical Damage and knocking them back 8 meters.",
  icon: "/esoui/art/icons/ability_bow_004_b.dds",
  esoSkillId: 40869,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 796,
  createdAt: "2026-05-26T02:38:38.335Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.076830408 MaxStat + 0.806719284 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 8 meters (Constant)",
  ],
} as const satisfies TemperSkill
