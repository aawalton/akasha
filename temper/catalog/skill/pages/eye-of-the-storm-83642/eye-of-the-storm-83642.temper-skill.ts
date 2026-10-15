import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const eyeOfTheStorm83642 = {
  id: "019e6f53-a1da-7ac6-af41-3605b23db62b",
  type: "page-type/temper-skill",
  slug: "eye-of-the-storm-83642",
  title: "Eye of the Storm",
  key: "eye-of-the-storm-83642",
  baseName: "Elemental Storm",
  description:
    "Create a cataclysmic storm above you that builds for |cffffff2|r seconds then lays waste to all enemies nearby, dealing |cffffff6257|r Magic Damage every |cffffff1|r second for |cffffff7|r seconds.",
  icon: "/esoui/art/icons/ability_destructionstaff_012_a.dds",
  esoSkillId: 83642,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 50,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 494,
  createdAt: "2026-05-28T16:03:32.442Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.07748 MaxStat + 0.81349 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, DOT, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 7 seconds (Constant)",
  ],
} as const satisfies TemperSkill
