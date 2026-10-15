import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shiftingStandard32958 = {
  id: "019e6f53-a701-7d8a-a465-7521141678ee",
  type: "page-type/temper-skill",
  slug: "shifting-standard-32958",
  title: "Shifting Standard",
  key: "shifting-standard-32958",
  baseName: "Dragonknight Standard",
  description:
    "Call down a battle standard, dealing |cffffff3128|r Flame Damage every |cffffff1|r second for |cffffff25|r seconds to enemies and applying Major Defile to them, reducing their healing received and damage shield strength by |cffffff12|r%. \n\nActivating this ability again allows you to move the standard to your location.\n\nAn ally near the standard can activate the Shackle synergy, dealing |cffffff12393|r Flame Damage to enemies in the area and immobilizing them for |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_006_a.dds",
  esoSkillId: 32958,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/dragonknight-ardent-flame",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1171,
  createdAt: "2026-05-28T16:03:33.761Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0387472 MaxStat + 0.407029 MaxPower - 1.95945 (Ultimate, ratio = 10.50, Dmg, Flame, AOE, DOT, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 25 seconds (Constant)",
    "<<4>> = 12% (Constant)",
    "<<5>> = Shackle (Constant)",
    "<<6>> = 0.15 MaxStat + 1.575 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<7>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
