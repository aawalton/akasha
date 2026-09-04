import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const livingDark = {
  id: "019e6245-a6be-7e5a-a827-2354f4e2e2d3",
  pageTypeSlug: "temper-skill",
  slug: "living-dark",
  title: "Living Dark",
  key: "living-dark",
  baseName: "Eclipse",
  description:
    '"Envelop yourself in a lightless sphere for 10 seconds to protect yourself. Anytime you take direct damage, the sphere lashes back at the attacker, reducing their Movement Speed by 40% for 3 seconds and healing you for 2066 Health. These effects can occur once every half second."',
  icon: "/esoui/art/icons/ability_templar_unstable_core.dds",
  esoSkillId: 27324,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
