import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const symbiosis = {
  id: "019e6238-c31d-7eda-a892-68fe356c5ce5",
  pageTypeSlug: "temper-skill",
  slug: "symbiosis",
  title: "Symbiosis",
  key: "symbiosis",
  baseName: "Mend Wounds",
  description:
    '"Invoke the Rites of Moawita, replacing your Light and Heavy Attacks with healing abilities that can be used on allies.\\n\\nYour Light Attacks heal for 972.\\n\\nYour Heavy Attacks heal for 863 every 1 second, and restore 1155 Magicka to you for successfully healing.\\n\\nYou heal yourself for 50% of the amount of healing done to the ally."',
  icon: "/esoui/art/icons/ability_psijic_006_b.dds",
  esoSkillId: 40103755,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
