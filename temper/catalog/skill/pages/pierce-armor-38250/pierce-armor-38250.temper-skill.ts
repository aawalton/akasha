import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pierceArmor38250 = {
  id: "019e6f53-a500-74f6-a923-f2ed42a011a2",
  type: "page-type/temper-skill",
  slug: "pierce-armor-38250",
  title: "Pierce Armor",
  key: "pierce-armor-38250",
  baseName: "Puncture",
  description:
    "Thrust your weapon with disciplined precision at an enemy, dealing |cffffff4170|r Physical Damage and taunting them to attack you for |cffffff15|r seconds.\n\nAlso inflicts Minor Breach and Major Breach on the enemy, reducing their Physical Resistance and Spell Resistance by |cffffff2974|r and |cffffff5948|r for |cffffff15|r seconds.",
  icon: "/esoui/art/icons/ability_1handed_002_b.dds",
  esoSkillId: 38250,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 892,
  createdAt: "2026-05-28T16:03:33.248Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = Minor Breach (Constant)",
    "<<4>> = Major Breach (Constant)",
    "<<5>> = 2974 (Constant)",
    "<<6>> = 5948 (Constant)",
    "<<7>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
