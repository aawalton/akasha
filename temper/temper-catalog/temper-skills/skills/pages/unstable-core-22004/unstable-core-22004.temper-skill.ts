import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unstableCore22004 = {
  id: "019e6f53-a895-7dcc-9d6e-70b7868c0ce1",
  pageTypeSlug: "temper-skill",
  slug: "unstable-core-22004",
  title: "Unstable Core",
  key: "unstable-core-22004",
  baseName: "Eclipse",
  description:
    '"Envelop an enemy in a lightless sphere for |cffffff4|r seconds, that harms them with growing intensity anytime they deal direct damage. Limited to one.\\n\\nTheir first attack reduces their Movement Speed by |cffffff30|r% for |cffffff4|r seconds and deals |cffffff1652|r Magic Damage, their second attack immobilizes them for |cffffff3|r seconds and deals |cffffff3305|r Magic Damage, and their third attack stuns them for |cffffff3|r seconds and deals |cffffff6611|r Magic Damage. The effects can activate once every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_templar_total_dark.dds",
  esoSkillId: 22004,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
