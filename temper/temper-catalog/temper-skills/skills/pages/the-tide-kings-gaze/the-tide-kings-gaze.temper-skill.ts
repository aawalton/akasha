import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const theTideKingsGaze = {
  id: "019e6245-a752-76e7-81eb-05a330c70562",
  pageTypeSlug: "temper-skill",
  slug: "the-tide-kings-gaze",
  title: "The Tide King's Gaze",
  key: "the-tide-kings-gaze",
  baseName: "The Unblinking Eye",
  description:
    '"Tear open the fabric of the Aurbis to summon a scion of Hermaeus Mora. This being casts forth a beam that rends asunder reality for 8 seconds that deals 1151 Magic Damage to enemies within 5 meters every 0.5 seconds. \\n\\nThe scion\'s beam automatically follows the initial target, and hunts for a new one within 8 meters if it is slain."',
  icon: "/esoui/art/icons/ability_arcanist_006_a.dds",
  esoSkillId: 40189837,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "ultimate",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
