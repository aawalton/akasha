import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const theLanguidEye189867 = {
  id: "019e6f53-a831-7c62-8438-269dc71efdb2",
  type: "page-type/temper-skill",
  slug: "the-languid-eye-189867",
  title: "The Languid Eye",
  key: "the-languid-eye-189867",
  baseName: "The Unblinking Eye",
  description:
    "Tear open the fabric of the Aurbis to summon a scion of Hermaeus Mora. This being casts forth a beam that rends asunder reality for |cffffff6|r seconds that deals |cffffff3876|r Magic Damage to enemies within 5 meters every |cffffff0.5|r seconds and snares them by |cffffff50|r% for |cffffff3|r seconds. Every |cffffff0.5|r seconds, the beam's damage increases by |cffffff7|r%.\n\nThe scion's beam can be repositioned by recasting The Languid Eye.",
  icon: "/esoui/art/icons/ability_arcanist_006_b.dds",
  esoSkillId: 189867,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1338,
  createdAt: "2026-05-28T16:03:34.065Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 0.0495907 MaxStat + 0.520546 MaxPower - 0.608159 (Ultimate, ratio = 10.50, Dmg, Magic, AOE, DOT, 0.5s tick, R2 = 0.999999)",
    "<<3>> = 0.5 seconds (Constant)",
    "<<4>> = 35% (Constant)",
    "<<5>> = 3 seconds (Constant)",
    "<<6>> = 7% (Constant)",
  ],
} as const satisfies TemperSkill
