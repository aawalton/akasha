import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const healingThicket85807 = {
  id: "019e6f53-a2e8-7fdb-9407-49a4fd2d1351",
  type: "page-type/temper-skill",
  slug: "healing-thicket-85807",
  title: "Healing Thicket",
  key: "healing-thicket-85807",
  baseName: "Secluded Grove",
  description:
    "Swell a healing forest at the target location, instantly healing the most injured friendly target for |cffffff9057|r Health. The forest continues to heal you and your allies in the area for |cffffff3017|r every |cffffff1|r second for |cffffff6|r seconds.\n\nThe healing over time will continue to heal you or your allies for |cffffff4|r seconds after leaving the forest.",
  icon: "/esoui/art/icons/ability_warden_012_b.dds",
  esoSkillId: 85807,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 608,
  createdAt: "2026-05-28T16:03:32.712Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12396 MaxStat + 1.30158 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.04132 MaxStat + 0.43386 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, DOT, 4s duration, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 6 seconds (Constant)",
    "<<5>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
