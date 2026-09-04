import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unbreakableFate = {
  id: "019e6245-a757-7c82-9d63-8177beb7664f",
  pageTypeSlug: "temper-skill",
  slug: "unbreakable-fate",
  title: "Unbreakable Fate",
  key: "unbreakable-fate",
  baseName: "Fatewoven Armor",
  description:
    '"Forge defiant runic armor around you, granting 5% Block Mitigation and Major Resolve for 20 seconds, increasing your Armor by 5948 for 20 seconds.\\n\\nConsume Crux to gain 5% additional Block Mitigation per Crux spent.\\n\\nWhile the armor persists, taking damage applies Minor Breach, reducing the Armor of your attacker by 2974 for 6 seconds."',
  icon: "/esoui/art/icons/ability_arcanist_009_b.dds",
  esoSkillId: 40186477,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
