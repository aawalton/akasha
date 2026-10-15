import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pierceArmor = {
  id: "019e6226-0102-744e-96a0-d0f1de0cdd1d",
  type: "page-type/temper-skill",
  slug: "pierce-armor",
  title: "Pierce Armor",
  key: "pierce-armor",
  baseName: "Puncture",
  description:
    "Thrust your weapon with disciplined precision at an enemy, dealing 1199 Physical Damage and taunting them to attack you for 15 seconds.\n\nAlso inflicts Minor Breach and Major Breach on the enemy, reducing their Physical Resistance and Spell Resistance by 2974 and 5948 for 15 seconds.",
  icon: "/esoui/art/icons/ability_1handed_002_b.dds",
  esoSkillId: 41497,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 891,
  createdAt: "2026-05-26T02:38:38.338Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05335445 MaxStat + 0.560221725 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = Minor Breach (Constant)",
    "<<4>> = Major Breach (Constant)",
    "<<5>> = 2974 (Constant)",
    "<<6>> = 5948 (Constant)",
    "<<7>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
