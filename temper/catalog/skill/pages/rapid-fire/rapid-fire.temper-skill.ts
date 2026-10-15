import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rapidFire = {
  id: "019e6f53-a5a0-7884-b007-bdbb1d34eda3",
  type: "page-type/temper-skill",
  slug: "rapid-fire",
  title: "Rapid Fire",
  key: "rapid-fire",
  baseName: "Rapid Fire",
  description:
    "Unleash a barrage of arrows at an enemy, dealing |cffffff60561|r Physical Damage over |cffffff4|r seconds. \n\nYou can move at full speed and are immune to all disabling effects while channeling this attack.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_bow_006.dds",
  esoSkillId: 83465,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 976,
  createdAt: "2026-05-28T16:03:33.408Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0832801 MaxStat + 0.87503 MaxPower - 1.09599 (Ultimate, ratio = 10.51, Dmg, Physical, SingleTarget, Direct, 3.625s duration, 0.453s tick, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
