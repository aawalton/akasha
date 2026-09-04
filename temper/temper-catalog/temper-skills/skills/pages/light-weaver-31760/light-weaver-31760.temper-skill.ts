import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightWeaver31760 = {
  id: "019e6f53-a3f7-7663-9d07-1af6811336ba",
  pageTypeSlug: "temper-skill",
  slug: "light-weaver-31760",
  title: "Light Weaver",
  key: "light-weaver-31760",
  baseName: "Light Weaver",
  description:
    '"When you heal an ally under |cffffff50|r% Health with a Restoring Light ability, you grant them |cffffff1|r Ultimate.\\n\\nActivating an ability with a cast or channel time while in combat causes you to automatically block all attacks at no cost for |cffffff2|r seconds, up to once every |cffffff30|r seconds."',
  icon: "/esoui/art/icons/ability_templar_012.dds",
  esoSkillId: 31760,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "templar-restoring-light",
  skillType: "passive",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
