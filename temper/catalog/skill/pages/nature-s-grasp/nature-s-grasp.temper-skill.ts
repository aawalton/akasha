import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const natureSGrasp = {
  id: "019e6f53-a4af-798d-998a-b9d949112f50",
  type: "page-type/temper-skill",
  slug: "nature-s-grasp",
  title: "Nature's Grasp",
  key: "nature-s-grasp",
  baseName: "Nature's Grasp",
  description:
    "Launch a vine to swing yourself to an ally, healing them for |cffffff10950|r Health over |cffffff10|r seconds. You gain |cffffff3|r Ultimate when this effect completes if you are in combat.",
  icon: "/esoui/art/icons/ability_warden_011.dds",
  esoSkillId: 85564,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 849,
  createdAt: "2026-05-28T16:03:33.167Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.025 MaxStat + 0.2625 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, DOT, 10s duration, 2s tick, R2 = 1)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 3 (Constant)",
  ],
} as const satisfies TemperSkill
