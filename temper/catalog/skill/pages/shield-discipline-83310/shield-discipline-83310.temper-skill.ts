import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shieldDiscipline83310 = {
  id: "019e6f53-a6f8-7d10-a037-83becd0c23ef",
  type: "page-type/temper-skill",
  slug: "shield-discipline-83310",
  title: "Shield Discipline",
  key: "shield-discipline-83310",
  baseName: "Shield Wall",
  description:
    "Reinforce your shield, allowing you to automatically block all attacks at no cost for |cffffff8|r seconds.\n\nYour One Hand and Shield non-Ultimate abilities cost nothing while this effect persists.",
  icon: "/esoui/art/icons/ability_1handed_006_b.dds",
  esoSkillId: 83310,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 50,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1167,
  createdAt: "2026-05-28T16:03:33.752Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 6 seconds (Constant)"],
} as const satisfies TemperSkill
