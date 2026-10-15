import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const eyeOfTheStorm = {
  id: "019e6226-00f0-757f-946c-09d7fdb66aa5",
  type: "page-type/temper-skill",
  slug: "eye-of-the-storm",
  title: "Eye of the Storm",
  key: "eye-of-the-storm",
  baseName: "Elemental Storm",
  description:
    "Create a cataclysmic storm above you that builds for 2 seconds then lays waste to all enemies nearby, dealing 1799 Magic Damage every 1 second for 7 seconds.",
  icon: "/esoui/art/icons/ability_destructionstaff_012_a.dds",
  esoSkillId: 86534,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 493,
  createdAt: "2026-05-26T02:38:38.320Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.08003684 MaxStat + 0.84033517 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, DOT, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 7 seconds (Constant)",
  ],
} as const satisfies TemperSkill
