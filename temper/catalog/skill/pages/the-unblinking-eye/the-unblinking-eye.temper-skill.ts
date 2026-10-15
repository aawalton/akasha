import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const theUnblinkingEye = {
  id: "019e6f53-a837-7fd0-bf5a-83e2ba20cdf4",
  type: "page-type/temper-skill",
  slug: "the-unblinking-eye",
  title: "The Unblinking Eye",
  key: "the-unblinking-eye",
  baseName: "The Unblinking Eye",
  description:
    "Tear open the fabric of the Aurbis to summon a scion of Hermaeus Mora. This being casts forth a beam that rends asunder reality for |cffffff6|r seconds and deals |cffffff3875|r Magic Damage to enemies within 5 meters every |cffffff0.5|r seconds.\n\nThe scion's beam can be repositioned by recasting The Unblinking Eye.",
  icon: "/esoui/art/icons/ability_arcanist_006.dds",
  esoSkillId: 189791,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1342,
  createdAt: "2026-05-28T16:03:34.071Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 0.0480899 MaxStat + 0.503159 MaxPower - 0.316987 (Ultimate, ratio = 10.46, Dmg, Magic, AOE, DOT, 0.5s tick, R2 = 0.999999)",
    "<<3>> = 0.5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
