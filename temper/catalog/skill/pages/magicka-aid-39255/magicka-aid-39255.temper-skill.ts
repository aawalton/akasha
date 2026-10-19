import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const magickaAid39255 = {
  id: "019e6f53-a436-7bc2-871d-fe3b70477257",
  type: "page-type/temper-skill",
  slug: "magicka-aid-39255",
  title: "Magicka Aid",
  key: "magicka-aid-39255",
  baseName: "Magicka Aid",
  description:
    "Increases your Magicka Recovery by |cffffff5|r% for each Support ability slotted.\n\nCurrent bonus: |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 39255,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/passive",
  effects: "jsonl",
  hashPlace: 785,
  createdAt: "2026-05-28T16:03:33.046Z",
  updatedAt: "2026-10-19T22:59:16.876Z",
  equations: ["<<1>> = 5 Support (Support Skills Slotted, SingleTarget, Direct, R2 = 1)"],
} as const satisfies TemperSkill
