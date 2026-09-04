import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mendSpirit = {
  id: "019e6238-c2e9-7653-94c4-453cc2bbb047",
  pageTypeSlug: "temper-skill",
  slug: "mend-spirit",
  title: "Mend Spirit",
  key: "mend-spirit",
  baseName: "Mend Wounds",
  description:
    '"Invoke the Rites of Moawita, replacing your Light and Heavy Attacks with healing abilities that only can be used on allies.\\n\\nYour Light Attacks heal for 972.\\n\\nYour Heavy Attacks heal for 863 every 1 second, and restore 1155 Magicka to you for successfully healing.\\n\\nAfter you heal an ally you grant them Major Resolve, increasing their Physical and Spell Resistance by 5948 for 5 seconds."',
  icon: "/esoui/art/icons/ability_psijic_006_a.dds",
  esoSkillId: 40103747,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
