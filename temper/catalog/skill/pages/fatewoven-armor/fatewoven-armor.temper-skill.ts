import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fatewovenArmor = {
  id: "019e6f53-a1e4-7156-81ad-acdcdc88fe1e",
  type: "page-type/temper-skill",
  slug: "fatewoven-armor",
  title: "Fatewoven Armor",
  key: "fatewoven-armor",
  baseName: "Fatewoven Armor",
  description:
    "Forge defiant runic armor around you, granting Major Resolve for |cffffff20|r seconds, increasing your Armor by |cffffff5948|r.\n\nWhile the armor persists, taking damage applies Minor Breach, reducing the Armor of your attacker by |cffffff2974|r for |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_arcanist_009.dds",
  esoSkillId: 183648,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 501,
  createdAt: "2026-05-28T16:03:32.452Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 17 seconds (Constant)",
    "<<2>> = 5948 (Constant)",
    "<<3>> = 2974 (Constant)",
    "<<4>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
