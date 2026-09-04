import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBettyNetch = {
  id: "019e6f53-a8bd-7e4b-a3ae-36329985ac5f",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-betty-netch",
  title: "Vengeance Betty Netch",
  key: "vengeance-betty-netch",
  baseName: "Vengeance Betty Netch",
  description:
    '"Call a betty netch to your side, which grants you Minor Berserk, increasing your damage done by |cffffff5|r% for |cffffff20|r seconds, and removing a negative effect from yourself."',
  icon: "/esoui/art/icons/ability_warden_017_a.dds",
  esoSkillId: 238020,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-animal-companions",
  skillType: "active",
  subcategoryId: "vengeance-warden-animal-companions",
} as const satisfies TemperSkill
