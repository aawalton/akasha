import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceEclipse = {
  id: "019e6f53-a8fa-7096-964c-d9c10d18b227",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-eclipse",
  title: "Vengeance Eclipse",
  key: "vengeance-eclipse",
  baseName: "Vengeance Eclipse",
  description:
    '"Envelop an enemy in a lightless sphere, stunning them for |cffffff3|r seconds.\\n\\nThis ability cannot be blocked."',
  icon: "/esoui/art/icons/ability_templar_eclipse.dds",
  esoSkillId: 237964,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "vengeance-templar-dawns-wrath",
} as const satisfies TemperSkill
