import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const panacea = {
  id: "019e6f53-a4de-791c-9c60-81dea6798c0f",
  type: "page-type/temper-skill",
  slug: "panacea",
  title: "Panacea",
  key: "panacea",
  baseName: "Panacea",
  description:
    "Release the rejuvenating energies of your staff to swirl around you, healing you or an ally for |cffffff9133|r Health every |cffffff1|r second for |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_006.dds",
  esoSkillId: 83552,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 873,
  createdAt: "2026-05-28T16:03:33.214Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.125 MaxStat + 1.3125 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
