import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const toxicBarrage = {
  id: "019e6226-011a-7864-b768-1fa3fee7242f",
  type: "page-type/temper-skill",
  slug: "toxic-barrage",
  title: "Toxic Barrage",
  key: "toxic-barrage",
  baseName: "Rapid Fire",
  description:
    "Unleash a barrage of arrows at an enemy, dealing 17415 Poison Damage over 4 seconds. \n\nAfter dealing damage you poison the enemy, dealing an additional 9990 Poison Damage over 8 seconds after a 1 second delay.  \n\nYou can move at full speed and are immune to all disabling effects while channeling this attack.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_bow_006_b.dds",
  esoSkillId: 86603,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1356,
  createdAt: "2026-05-26T02:38:38.362Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0860249 MaxStat + 0.904228 MaxPower - 1.89049 (Ultimate, ratio = 10.51, Dmg, Poison, SingleTarget, Direct, 3.625s duration, 0.453s tick, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 0.0889 MaxStat + 0.934354 MaxPower - 3.02574 (Ultimate, ratio = 10.51, Dmg, Poison, SingleTarget, DOT, 8s duration, 2s tick, R2 = 1)",
    "<<4>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
