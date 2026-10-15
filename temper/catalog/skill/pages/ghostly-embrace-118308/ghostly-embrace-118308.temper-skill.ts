import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ghostlyEmbrace118308 = {
  id: "019e6f53-a275-7ebc-9e02-fd8d2aa08d86",
  type: "page-type/temper-skill",
  slug: "ghostly-embrace-118308",
  title: "Ghostly Embrace",
  key: "ghostly-embrace-118308",
  baseName: "Grave Grasp",
  description:
    "Summon three patches of skeletal claws from the ground in front of you, each dealing |cffffff3305|r Frost Damage.\n\nThe first area applies the Chilled status effect, the second area deals an additional |cffffff5375|r Frost Damage over |cffffff5|r seconds, and the final area creates a corpse if at least one enemy was hit.",
  icon: "/esoui/art/icons/ability_necromancer_009_b.dds",
  esoSkillId: 118308,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 559,
  createdAt: "2026-05-28T16:03:32.597Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0387472 MaxStat + 0.407029 MaxPower - 1.95945 (Ultimate, ratio = 10.50, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0140536 MaxStat + 0.148192 MaxPower + 0.12468 (Ultimate, ratio = 10.54, Dmg, Frost, SingleTarget, DOT, 4s duration, 1s tick, R2 = 0.999993)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
