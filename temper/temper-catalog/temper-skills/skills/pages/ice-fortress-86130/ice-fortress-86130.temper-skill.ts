import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const iceFortress86130 = {
  id: "019e6f53-a341-761a-b1de-ca1f1a0a6026",
  pageTypeSlug: "temper-skill",
  slug: "ice-fortress-86130",
  title: "Ice Fortress",
  key: "ice-fortress-86130",
  baseName: "Frost Cloak",
  description:
    '"Wrap a thick cloak of ice around you and your grouped allies. The ice grants Major Resolve, increasing your Physical and Spell Resistance by |cffffff5948|r for |cffffff30|r seconds.\\n\\nYou gain Minor Protection, reducing your damage taken by |cffffff5|r% for |cffffff30|r seconds."',
  icon: "/esoui/art/icons/ability_warden_001_b.dds",
  esoSkillId: 86130,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
