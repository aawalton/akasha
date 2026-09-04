import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightWeaver = {
  id: "019e6245-a6bb-7c45-a518-fbc94c45bff6",
  pageTypeSlug: "temper-skill",
  slug: "light-weaver",
  title: "Light Weaver",
  key: "light-weaver",
  baseName: "Light Weaver",
  description:
    '"When you heal an ally under 50% Health with a Restoring Light ability, you grant them 2 Ultimate.\\n\\nActivating an ability with a cast or channel time while in combat causes you to automatically block all attacks at no cost for 2 seconds, up to once every 15 seconds."',
  icon: "/esoui/art/icons/ability_templar_012.dds",
  esoSkillId: 45208,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-restoring-light",
  skillType: "passive",
  subcategoryId: "templar-restoring-light",
  status: "unsupported",
} as const satisfies TemperSkill
