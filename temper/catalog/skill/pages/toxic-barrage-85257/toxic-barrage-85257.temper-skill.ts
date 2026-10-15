import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const toxicBarrage85257 = {
  id: "019e6f53-a851-7e3f-b618-3662eaa3805e",
  type: "page-type/temper-skill",
  slug: "toxic-barrage-85257",
  title: "Toxic Barrage",
  key: "toxic-barrage-85257",
  baseName: "Rapid Fire",
  description:
    "Unleash a barrage of arrows at an enemy, dealing |cffffff60570|r Poison Damage over |cffffff4|r seconds. \n\nAfter dealing damage you poison the enemy, dealing an additional |cffffff32790|r Poison Damage over |cffffff8|r seconds after a |cffffff1|r second delay.  \n\nYou can move at full speed and are immune to all disabling effects while channeling this attack.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_bow_006_b.dds",
  esoSkillId: 85257,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 50,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1357,
  createdAt: "2026-05-28T16:03:34.097Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0860249 MaxStat + 0.904228 MaxPower - 1.89049 (Ultimate, ratio = 10.51, Dmg, Poison, SingleTarget, Direct, 3.625s duration, 0.453s tick, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 0.086046 MaxStat + 0.90445 MaxPower - 1.89095 (Ultimate, ratio = 10.51, Dmg, Poison, SingleTarget, DOT, 8s duration, 2s tick, R2 = 1)",
    "<<4>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
