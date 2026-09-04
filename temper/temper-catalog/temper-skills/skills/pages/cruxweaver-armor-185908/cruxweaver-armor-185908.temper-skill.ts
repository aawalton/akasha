import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cruxweaverArmor185908 = {
  id: "019e6f53-a046-7232-bd8d-a7cdca187b08",
  pageTypeSlug: "temper-skill",
  slug: "cruxweaver-armor-185908",
  title: "Cruxweaver Armor",
  key: "cruxweaver-armor-185908",
  baseName: "Fatewoven Armor",
  description:
    '"Forge defiant runic armor around you, granting Major Resolve for |cffffff30|r seconds, increasing your Armor by |cffffff5948|r.\\n\\nWhile the armor persists, taking damage applies Minor Breach, reducing the Armor of your attacker by |cffffff2974|r for |cffffff6|r seconds. Blows against your armor also generate Crux, up to once every |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_arcanist_009_a.dds",
  esoSkillId: 185908,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
