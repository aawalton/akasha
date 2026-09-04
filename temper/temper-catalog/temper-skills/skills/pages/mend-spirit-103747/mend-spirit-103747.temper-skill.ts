import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mendSpirit103747 = {
  id: "019e6f53-a46f-7611-9c86-dafe038f2be9",
  pageTypeSlug: "temper-skill",
  slug: "mend-spirit-103747",
  title: "Mend Spirit",
  key: "mend-spirit-103747",
  baseName: "Mend Wounds",
  description:
    '"Invoke the Rites of Moawita, replacing your Light and Heavy Attacks with healing abilities that only can be used on allies.\\n\\nYour Light Attacks heal for |cffffff3056|r.\\n\\nYour Heavy Attacks heal for |cffffff2716|r every |cffffff1|r second, and restore |cffffff1155|r Magicka to you for successfully healing.\\n\\nAfter you heal an ally you grant them Major Resolve, increasing their Physical and Spell Resistance by |cffffff5948|r for |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_psijic_006_a.dds",
  esoSkillId: 103747,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 6,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
