import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dragonLeap = {
  id: "019e6f53-a0e5-7595-ba78-0c8095515409",
  type: "page-type/temper-skill",
  slug: "dragon-leap",
  title: "Dragon Leap",
  key: "dragon-leap",
  baseName: "Dragon Leap",
  description:
    "Launch yourself at an enemy, dealing |cffffff13129|r Flame Damage to all enemies in the area, knocking players back |cffffff4|r meters and stunning them for |cffffff2|r seconds. If the target is a monster they are instead knocked into the air and stunned for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_009.dds",
  esoSkillId: 29012,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 379,
  createdAt: "2026-05-28T16:03:32.197Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.153833 MaxStat + 1.61525 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 4 meters (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
