import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const sleetStorm = {
  id: "019e6f53-a73e-75e8-bc02-717936284b4a",
  type: "page-type/temper-skill",
  slug: "sleet-storm",
  title: "Sleet Storm",
  key: "sleet-storm",
  baseName: "Sleet Storm",
  description:
    "Twist a violent storm around you, dealing |cffffff4036|r Frost Damage every |cffffff1|r second for |cffffff8|r seconds to enemies around you and reducing their Movement Speed by |cffffff40|r%.  \n\nYou and nearby allies gain Major Protection, reducing your damage taken by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_warden_006.dds",
  esoSkillId: 86109,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1208,
  createdAt: "2026-05-28T16:03:33.822Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05 MaxStat + 0.525 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Frost, AOE, DOT, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 40% (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
