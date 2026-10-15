import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceGibberingShield = {
  id: "019e6f53-a91a-7b6c-a0ff-a91e612c348a",
  type: "page-type/temper-skill",
  slug: "vengeance-gibbering-shield",
  title: "Vengeance Gibbering Shield",
  key: "vengeance-gibbering-shield",
  baseName: "Vengeance Gibbering Shield",
  description:
    "Gather the true strength of Apocrypha around you, forming protective tentacles and a damage shield that absorbs |cffffff60%|r of all damage for |cffffff10|r seconds, up to a max of |cffffff80500|r damage.\n\nWhen the shield collapses you lash out, dealing |cffffff13440|r Magic Damage to up to 3 enemies within 5 meters.",
  icon: "/esoui/art/icons/ability_arcanist_012.dds",
  esoSkillId: 238274,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1483,
  createdAt: "2026-05-28T16:03:34.298Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 60% (Constant)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 70000 (Constant)",
    "<<4>> = 12000 Magic Damage (Constant)",
    "<<5>> = 12 (Constant)",
  ],
} as const satisfies TemperSkill
