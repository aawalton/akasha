import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const theUnblinkingEye = {
  id: "019e6f53-a837-7fd0-bf5a-83e2ba20cdf4",
  pageTypeSlug: "temper-skill",
  slug: "the-unblinking-eye",
  title: "The Unblinking Eye",
  key: "the-unblinking-eye",
  baseName: "The Unblinking Eye",
  description:
    '"Tear open the fabric of the Aurbis to summon a scion of Hermaeus Mora. This being casts forth a beam that rends asunder reality for |cffffff6|r seconds and deals |cffffff3875|r Magic Damage to enemies within 5 meters every |cffffff0.5|r seconds.\\n\\nThe scion\'s beam can be repositioned by recasting The Unblinking Eye."',
  icon: "/esoui/art/icons/ability_arcanist_006.dds",
  esoSkillId: 189791,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "ultimate",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
