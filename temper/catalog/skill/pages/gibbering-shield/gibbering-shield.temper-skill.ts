import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const gibberingShield = {
  id: "019e6f53-a27d-7d7e-bd72-e91c64a58d74",
  type: "page-type/temper-skill",
  slug: "gibbering-shield",
  title: "Gibbering Shield",
  key: "gibbering-shield",
  baseName: "Gibbering Shield",
  description:
    "Gather the true strength of Apocrypha around you, forming protective tentacles and a damage shield that absorbs |cffffff60|r% of all damage for |cffffff10|r seconds, up to a max of |cffffff44973|r damage, scaling off your Max Health.\n\nWhen the shield collapses you lash out, dealing all of the damage absorbed as Magic Damage to enemies within 5 meters over |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_arcanist_012.dds",
  esoSkillId: 183676,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 562,
  createdAt: "2026-05-28T16:03:32.605Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 60% (Constant)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 1.92 Health (Health, RankMod(1), DmgShield, SingleTarget, Direct, 10s duration, R2 = 1)",
    "<<4>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
