import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const masterRitualist = {
  id: "019e6245-a6cc-70c5-a6c2-ffbf060f9857",
  pageTypeSlug: "temper-skill",
  slug: "master-ritualist",
  title: "Master Ritualist",
  key: "master-ritualist",
  baseName: "Master Ritualist",
  description:
    '"Increases resurrection speed by 20%. \\n\\nResurrected allies return with 100% more Health. \\n\\nGives you a 50% chance to fill an empty Soul Gem after each successful resurrection."',
  icon: "/esoui/art/icons/ability_templar_026.dds",
  esoSkillId: 45202,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-restoring-light",
  skillType: "passive",
  subcategoryId: "templar-restoring-light",
  status: "unsupported",
} as const satisfies TemperSkill
