import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const deathStroke = {
  id: "019e6f53-a09f-76a3-be5c-3eff12ca8a87",
  type: "page-type/temper-skill",
  slug: "death-stroke",
  title: "Death Stroke",
  key: "death-stroke",
  baseName: "Death Stroke",
  description:
    "Ravage an enemy with a swift strike, dealing |cffffff12922|r Magic Damage and causing them to take |cffffff20|r% more damage from your attacks for |cffffff8|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_007.dds",
  esoSkillId: 33398,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 334,
  createdAt: "2026-05-28T16:03:32.127Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.16 MaxStat + 1.68 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
