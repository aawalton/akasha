import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const symbiosis103755 = {
  id: "019e6f53-a811-7de0-9029-c1f2103363ec",
  pageTypeSlug: "temper-skill",
  slug: "symbiosis-103755",
  title: "Symbiosis",
  key: "symbiosis-103755",
  baseName: "Mend Wounds",
  description:
    '"Invoke the Rites of Moawita, replacing your Light and Heavy Attacks with healing abilities that can be used on allies.\\n\\nYour Light Attacks heal for |cffffff3056|r.\\n\\nYour Heavy Attacks heal for |cffffff2716|r every |cffffff1|r second, and restore |cffffff1155|r Magicka to you for successfully healing.\\n\\nYou heal yourself for |cffffff51|r% of the amount of healing done to the ally."',
  icon: "/esoui/art/icons/ability_psijic_006_b.dds",
  esoSkillId: 103755,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
