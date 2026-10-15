import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dizzyingSwing = {
  id: "019e6226-00e6-76bf-8ae4-f58279539e73",
  type: "page-type/temper-skill",
  slug: "dizzying-swing",
  title: "Dizzying Swing",
  key: "dizzying-swing",
  baseName: "Uppercut",
  description:
    "Slam an enemy with an upward swing, dealing 2760 Physical Damage and setting them Off Balance for 7 seconds.  \n\nHitting an enemy that is already Off Balance stuns them for 2 seconds.\n\nTargets that are immune to Off Balance are snared by 40% for 2 seconds.",
  icon: "/esoui/art/icons/ability_2handed_001_a.dds",
  esoSkillId: 39984,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 375,
  createdAt: "2026-05-26T02:38:38.310Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.122715235 MaxStat + 1.28851255 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, Melee, 0.5s cooldown, R2 = 1)",
    "<<2>> = 7 seconds (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 40% (Constant)",
    "<<5>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
