import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const leechingVines = {
  id: "019e6245-a6ba-7c04-8972-2174b3bfd457",
  type: "page-type/temper-skill",
  slug: "leeching-vines",
  title: "Leeching Vines",
  key: "leeching-vines",
  baseName: "Living Vines",
  description:
    "Grow vines to embrace you or the lowest health ally in front of you for 10 seconds. The vines heal the target for 718 Health each time they take damage. This effect can occur once every 1 second.\n\nThe vines apply Minor Lifesteal to enemies that damage the target for 10 seconds, healing you and your allies for 600 Health every 1 second when damaging that enemy.",
  icon: "/esoui/art/icons/ability_warden_010_a.dds",
  esoSkillId: 93880,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 733,
  createdAt: "2026-05-26T03:13:12.378Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = 0.0320397 MaxStat + 0.336325 MaxPower - 2.84114 (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 0.999996)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 600 (Constant)",
    "<<6>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
