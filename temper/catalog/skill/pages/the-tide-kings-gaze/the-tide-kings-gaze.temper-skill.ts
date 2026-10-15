import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const theTideKingsGaze = {
  id: "019e6245-a752-76e7-81eb-05a330c70562",
  type: "page-type/temper-skill",
  slug: "the-tide-kings-gaze",
  title: "The Tide King's Gaze",
  key: "the-tide-kings-gaze",
  baseName: "The Unblinking Eye",
  description:
    "Tear open the fabric of the Aurbis to summon a scion of Hermaeus Mora. This being casts forth a beam that rends asunder reality for 8 seconds that deals 1151 Magic Damage to enemies within 5 meters every 0.5 seconds. \n\nThe scion's beam automatically follows the initial target, and hunts for a new one within 8 meters if it is slain.",
  icon: "/esoui/art/icons/ability_arcanist_006_a.dds",
  esoSkillId: 40189837,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1341,
  createdAt: "2026-05-26T03:13:12.530Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 8 seconds (Constant)",
    "<<2>> = 0.0512363 MaxStat + 0.537787 MaxPower - 1.498 (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, DOT, 0.5s tick, R2 = 0.999999)",
    "<<3>> = 0.5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
