import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fatewovenArmor = {
  id: "019e6f53-a1e4-7156-81ad-acdcdc88fe1e",
  pageTypeSlug: "temper-skill",
  slug: "fatewoven-armor",
  title: "Fatewoven Armor",
  key: "fatewoven-armor",
  baseName: "Fatewoven Armor",
  description:
    '"Forge defiant runic armor around you, granting Major Resolve for |cffffff20|r seconds, increasing your Armor by |cffffff5948|r.\\n\\nWhile the armor persists, taking damage applies Minor Breach, reducing the Armor of your attacker by |cffffff2974|r for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_arcanist_009.dds",
  esoSkillId: 183648,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
