import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const caltrops = {
  id: "019e6f53-9fad-7cf3-af02-b1c7881820c7",
  type: "page-type/temper-skill",
  slug: "caltrops",
  title: "Caltrops",
  key: "caltrops",
  baseName: "Caltrops",
  description:
    "Hurl a ball of caltrops that scatter over the target area, dealing |cffffff977|r Physical Damage every |cffffff1|r second to enemies inside, and reducing their Movement Speed by |cffffff50|r%.",
  icon: "/esoui/art/icons/ability_ava_001.dds",
  esoSkillId: 33376,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 180,
  createdAt: "2026-05-28T16:03:31.885Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0121567 MaxStat + 0.127209 MaxPower - 1.15438 (Ultimate, ratio = 10.46, Dmg, Physical, AOE, DOT, 1s tick, R2 = 0.999988)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 50% (Constant)",
  ],
} as const satisfies TemperSkill
