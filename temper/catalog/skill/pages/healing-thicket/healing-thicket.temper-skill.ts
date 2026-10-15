import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const healingThicket = {
  id: "019e6245-a69e-7dd0-9f37-40faa6da6b2b",
  type: "page-type/temper-skill",
  slug: "healing-thicket",
  title: "Healing Thicket",
  key: "healing-thicket",
  baseName: "Secluded Grove",
  description:
    "Swell a healing forest at the target location, instantly healing the most injured friendly target for 2880 Health. The forest continues to heal you and your allies in the area for 958 every 1 second for 6 seconds.\n\nThe healing over time will continue to heal you or your allies for 4 seconds after leaving the forest.",
  icon: "/esoui/art/icons/ability_warden_012_b.dds",
  esoSkillId: 93974,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 607,
  createdAt: "2026-05-26T03:13:12.350Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12805068 MaxStat + 1.34453214 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.04268356 MaxStat + 0.44817738 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, DOT, 4s duration, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 6 seconds (Constant)",
    "<<5>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
