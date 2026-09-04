import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const frostCloak = {
  id: "019e6f53-a246-79d2-9366-59c3252d1305",
  pageTypeSlug: "temper-skill",
  slug: "frost-cloak",
  title: "Frost Cloak",
  key: "frost-cloak",
  baseName: "Frost Cloak",
  description:
    '"Wrap a thick cloak of ice around you and your grouped allies. The ice grants Major Resolve, increasing your Physical and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_warden_001.dds",
  esoSkillId: 86122,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
