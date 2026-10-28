import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulSplittingTrap40328 = {
  id: "019e6f53-a776-71b6-a9d9-edc6cf08dc05",
  type: "page-type/temper-skill",
  slug: "soul-splitting-trap-40328",
  title: "Soul Splitting Trap",
  key: "soul-splitting-trap-40328",
  baseName: "Soul Trap",
  description:
    "Lay claim to enemy souls, dealing |cffffff7614|r Magic Damage to your target and any other nearby enemies over |cffffff10|r seconds.\n\nFills an empty Soul Gem if an affected enemy dies.",
  icon: "/esoui/art/icons/ability_otherclass_001_a.dds",
  esoSkillId: 40328,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 1235,
  createdAt: "2026-05-28T16:03:33.878Z",
  updatedAt: "2026-10-28T20:20:26.004Z",
  equations: [
    "<<1>> = 0.01897 MaxStat + 0.1988 MaxPower - 1.45945 (Ultimate, Dmg, Magic, SingleTarget, DOT, 10s duration, 2s tick, ticks on application)",
    "<<2>> = 10 seconds (Constant)",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The damage ticks once on application and every 2 seconds after, six ticks in all.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Every reading of the damage allows a stat coefficient from 0.0189492 to 0.0189849.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Every reading of the damage allows a power coefficient from 0.198728 to 0.198913.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The damage takes 0.01897 and 0.1988, the shortest decimals inside those ranges.",
    },
  ],
} as const satisfies TemperSkill
