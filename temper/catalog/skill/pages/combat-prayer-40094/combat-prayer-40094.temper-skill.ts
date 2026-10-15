import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const combatPrayer40094 = {
  id: "019e6f53-a007-74d7-9347-971e1d6155d0",
  type: "page-type/temper-skill",
  slug: "combat-prayer-40094",
  title: "Combat Prayer",
  key: "combat-prayer-40094",
  baseName: "Blessing of Protection",
  description:
    "Slam your staff down to activate its blessings, healing you and your allies in front of you for |cffffff8219|r Health.\n\nAlso grants Minor Berserk and Minor Resolve increasing you and your allies' damage done by |cffffff5|r% and Physical Resistance and Spell Resistance by |cffffff2974|r for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_003_b.dds",
  esoSkillId: 40094,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 14,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 231,
  createdAt: "2026-05-28T16:03:31.975Z",
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
