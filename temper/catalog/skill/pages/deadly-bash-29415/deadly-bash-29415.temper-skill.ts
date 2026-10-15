import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const deadlyBash29415 = {
  id: "019e6f53-a08f-7355-a271-d2dd277de649",
  type: "page-type/temper-skill",
  slug: "deadly-bash-29415",
  title: "Deadly Bash",
  key: "deadly-bash-29415",
  baseName: "Deadly Bash",
  description:
    "Improves your standard Bash attacks, causing them to deal |cffffff250|r more damage and cost |cffffff25|r% less Stamina.",
  icon: "/esoui/art/icons/ability_dragonknight_034.dds",
  esoSkillId: 29415,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 17,
  morphIndex: 0,
  rank: 17,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/passive",
  hashPlace: 325,
  createdAt: "2026-05-28T16:03:32.111Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 250 (Constant)", "<<2>> = 25% (Constant)"],
} as const satisfies TemperSkill
