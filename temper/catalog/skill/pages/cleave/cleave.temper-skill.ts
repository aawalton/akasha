import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cleave = {
  id: "019e6f53-9ff8-7a2a-a7f2-24ec39b7e91a",
  type: "page-type/temper-skill",
  slug: "cleave",
  title: "Cleave",
  key: "cleave",
  baseName: "Cleave",
  description:
    "Focus your strength into a mighty swing, dealing |cffffff6400|r Physical Damage to enemies in front of you.\n\nYou also gain a damage shield that absorbs |cffffff6177|r damage for |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_2handed_002.dds",
  esoSkillId: 20919,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 222,
  createdAt: "2026-05-28T16:03:31.960Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.075 MaxStat + 0.7875 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0749181 MaxStat + 0.787428 MaxPower + 0.553891 (Ultimate, ratio = 10.51, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
