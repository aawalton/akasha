import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const theLanguidEye = {
  id: "019e6245-a751-7613-8e03-0caaa7e45399",
  type: "page-type/temper-skill",
  slug: "the-languid-eye",
  title: "The Languid Eye",
  key: "the-languid-eye",
  baseName: "The Unblinking Eye",
  description:
    "Tear open the fabric of the Aurbis to summon a scion of Hermaeus Mora. This being casts forth a beam that rends asunder reality for 6 seconds that deals 1115 Magic Damage to enemies within 5 meters every 0.5 seconds and snares them by 50% for 3 seconds. Every 0.5 seconds, the beam's damage increases by 7%.\n\nThe scion's beam can be repositioned by recasting The Languid Eye.",
  icon: "/esoui/art/icons/ability_arcanist_006_b.dds",
  esoSkillId: 40189867,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1337,
  createdAt: "2026-05-26T03:13:12.529Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 0.0495907 MaxStat + 0.520546 MaxPower - 0.608159 (Ultimate, ratio = 10.50, Dmg, Magic, AOE, DOT, 0.5s tick, R2 = 0.999999)",
    "<<3>> = 0.5 seconds (Constant)",
    "<<4>> = 50% (Constant)",
    "<<5>> = 3 seconds (Constant)",
    "<<6>> = 7% (Constant)",
  ],
} as const satisfies TemperSkill
