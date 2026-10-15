import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lightsChampion = {
  id: "019e6226-00ff-706b-9dcf-76cf72928ee9",
  type: "page-type/temper-skill",
  slug: "lights-champion",
  title: "Light's Champion",
  key: "lights-champion",
  baseName: "Panacea",
  description:
    "Release the rejuvenating energies of your staff to swirl around you, healing you or a nearby ally for 2904 Health every 1 second for 5 seconds.\n\nAny friendly target you heal gains Major Force for 8 seconds, increasing their Critical Damage by 20%.",
  icon: "/esoui/art/icons/ability_restorationstaff_006_b.dds",
  esoSkillId: 86475,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 753,
  createdAt: "2026-05-26T02:38:38.335Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12913 MaxStat + 1.35581 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 5 seconds (Constant)",
    "<<4>> = 8 seconds (Constant)",
    "<<5>> = 20% (Constant)",
  ],
} as const satisfies TemperSkill
