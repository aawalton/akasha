import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elementalStorm = {
  id: "019e6f53-a121-7d07-808e-12d99a4acae7",
  type: "page-type/temper-skill",
  slug: "elemental-storm",
  title: "Elemental Storm",
  key: "elemental-storm",
  baseName: "Elemental Storm",
  description:
    "Create a cataclysmic storm at the target location that builds for |cffffff2|r seconds then lays waste to all enemies in the area, dealing |cffffff6057|r Magic Damage every |cffffff1|r second for |cffffff7|r seconds.",
  icon: "/esoui/art/icons/ability_destructionstaff_012.dds",
  esoSkillId: 83619,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 409,
  createdAt: "2026-05-28T16:03:32.257Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.075 MaxStat + 0.7875 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, DOT, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 7 seconds (Constant)",
  ],
} as const satisfies TemperSkill
