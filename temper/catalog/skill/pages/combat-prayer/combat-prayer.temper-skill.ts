import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const combatPrayer = {
  id: "019e6226-00db-7ea7-beab-e07a6aa263c1",
  type: "page-type/temper-skill",
  slug: "combat-prayer",
  title: "Combat Prayer",
  key: "combat-prayer",
  baseName: "Blessing of Protection",
  description:
    "Slam your staff down to activate its blessings, healing you and your allies in front of you for 2614 Health.\n\nAlso grants Minor Berserk and Minor Resolve increasing you and your allies' damage done by 5% and Physical Resistance and Spell Resistance by 2974 for 10 seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_003_b.dds",
  esoSkillId: 41189,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 230,
  createdAt: "2026-05-26T02:38:38.299Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.116213 MaxStat + 1.22023 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, R2 = 1)",
    "<<2>> = Minor Berserk (Constant)",
    "<<3>> = Minor Resolve (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 2974 (Constant)",
    "<<6>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
