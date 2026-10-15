import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const burstingVines = {
  id: "019e6245-a60d-7e01-b3fe-c177319df201",
  type: "page-type/temper-skill",
  slug: "bursting-vines",
  title: "Bursting Vines",
  key: "bursting-vines",
  baseName: "Nature's Grasp",
  description:
    "Launch a vine to swing yourself to an ally, instantly healing them for 2700 Health.  \n\nGain 10 Ultimate when healing an ally under 60% Health while you are in combat. This effect can occur every 4 seconds.",
  icon: "/esoui/art/icons/ability_warden_011_a.dds",
  esoSkillId: 93937,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 177,
  createdAt: "2026-05-26T03:13:12.205Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.120048029 MaxStat + 1.26049759 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 10 (Constant)",
    "<<3>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
