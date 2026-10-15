import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ghostlyEmbrace = {
  id: "019e6245-a68f-7bdd-ac77-5d6ffe11ce3e",
  type: "page-type/temper-skill",
  slug: "ghostly-embrace",
  title: "Ghostly Embrace",
  key: "ghostly-embrace",
  baseName: "Grave Grasp",
  description:
    "Summon three patches of skeletal claws from the ground in front of you, each dealing 898 Frost Damage.\n\nThe first area applies the Chilled status effect, the second area deals an additional 1635 Frost Damage over 5 seconds, and the final area creates a corpse if at least one enemy was hit.",
  icon: "/esoui/art/icons/ability_necromancer_009_b.dds",
  esoSkillId: 40118308,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 558,
  createdAt: "2026-05-26T03:13:12.335Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0400165 MaxStat + 0.420651 MaxPower - 2.83257 (Ultimate, ratio = 10.51, Dmg, Frost, AOE, Direct, Melee, R2 = 0.999999)",
    "<<2>> = 0.0145909 MaxStat + 0.1529 MaxPower - 1.02923 (Ultimate, ratio = 10.48, Dmg, Frost, SingleTarget, DOT, 4s duration, 1s tick, R2 = 0.999986)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
