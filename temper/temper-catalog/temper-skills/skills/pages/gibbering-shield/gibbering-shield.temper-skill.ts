import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const gibberingShield = {
  id: "019e6f53-a27d-7d7e-bd72-e91c64a58d74",
  pageTypeSlug: "temper-skill",
  slug: "gibbering-shield",
  title: "Gibbering Shield",
  key: "gibbering-shield",
  baseName: "Gibbering Shield",
  description:
    '"Gather the true strength of Apocrypha around you, forming protective tentacles and a damage shield that absorbs |cffffff60|r% of all damage for |cffffff10|r seconds, up to a max of |cffffff44973|r damage, scaling off your Max Health.\\n\\nWhen the shield collapses you lash out, dealing all of the damage absorbed as Magic Damage to enemies within 5 meters over |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_arcanist_012.dds",
  esoSkillId: 183676,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "ultimate",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
