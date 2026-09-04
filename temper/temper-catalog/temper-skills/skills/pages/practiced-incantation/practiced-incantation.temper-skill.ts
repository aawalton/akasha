import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const practicedIncantation = {
  id: "019e6245-a6ed-7aaa-a4e1-779d6c204390",
  pageTypeSlug: "temper-skill",
  slug: "practiced-incantation",
  title: "Practiced Incantation",
  key: "practiced-incantation",
  baseName: "Rite of Passage",
  description:
    '"Channel the grace of the gods, healing you and nearby allies for 2788 Health every 1 second for 8 seconds.\\n\\nWhile channeling this ability, you gain immunity to all disabling effects."',
  icon: "/esoui/art/icons/ability_templar_practiced_incantation.dds",
  esoSkillId: 27427,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-restoring-light",
  skillType: "ultimate",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
