import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cleansingRitual = {
  id: "019e6f53-9ff7-74b4-baa8-60731473e9d2",
  pageTypeSlug: "temper-skill",
  slug: "cleansing-ritual",
  title: "Cleansing Ritual",
  key: "cleansing-ritual",
  baseName: "Cleansing Ritual",
  description:
    '"Exalt in the sacred light of the Aedra, cleansing up to |cffffff2|r harmful effects from yourself immediately and healing you and nearby allies for |cffffff2655|r Health every |cffffff2|r seconds for |cffffff20|r seconds.\\n\\nAllies in the area can activate the Purify synergy, cleansing all harmful effects from themselves and healing for |cffffff6012|r Health."',
  icon: "/esoui/art/icons/ability_templar_cleansing_ritual.dds",
  esoSkillId: 22265,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
