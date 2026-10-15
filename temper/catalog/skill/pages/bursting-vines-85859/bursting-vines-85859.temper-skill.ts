import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const burstingVines85859 = {
  id: "019e6f53-9fa9-78dd-afb5-ec57e5bab671",
  type: "page-type/temper-skill",
  slug: "bursting-vines-85859",
  title: "Bursting Vines",
  key: "bursting-vines-85859",
  baseName: "Nature's Grasp",
  description:
    "Launch a vine to swing yourself to an ally, instantly healing them for |cffffff8489|r Health.  \n\nGain |cffffff10|r Ultimate when healing an ally under |cFFFFFF60%|r Health while you are in combat. This effect can occur every |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_warden_011_a.dds",
  esoSkillId: 85859,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 178,
  createdAt: "2026-05-28T16:03:31.881Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.116213 MaxStat + 1.22023 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 10 (Constant)",
    "<<3>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
