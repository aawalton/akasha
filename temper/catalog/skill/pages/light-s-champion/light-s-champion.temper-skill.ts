import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lightSChampion = {
  id: "019e6f53-a3f4-71b9-8396-763024a2ac83",
  type: "page-type/temper-skill",
  slug: "light-s-champion",
  title: "Light's Champion",
  key: "light-s-champion",
  baseName: "Panacea",
  description:
    "Release the rejuvenating energies of your staff to swirl around you, healing you or a nearby ally for |cffffff9133|r Health every |cffffff1|r second for |cffffff5|r seconds.\n\nAny friendly target you heal gains Major Force for |cffffff8|r seconds, increasing their Critical Damage by |cffffff20|r%.",
  icon: "/esoui/art/icons/ability_restorationstaff_006_b.dds",
  esoSkillId: 85132,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 50,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 746,
  createdAt: "2026-05-28T16:03:32.980Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12913 MaxStat + 1.35581 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 5 seconds (Constant)",
    "<<4>> = 5 seconds (Constant)",
    "<<5>> = 20% (Constant)",
  ],
} as const satisfies TemperSkill
