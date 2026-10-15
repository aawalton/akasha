import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const encase = {
  id: "019e6f53-a155-784d-9413-116bddbec291",
  type: "page-type/temper-skill",
  slug: "encase",
  title: "Encase",
  key: "encase",
  baseName: "Encase",
  description:
    "Call forth Daedric shards from the earth to immobilize enemies in front of you for |cffffff4|r seconds.\n\nEnemies hit are afflicted with Major Maim, reducing their damage done by |cffffff10|r% for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_cyclone.dds",
  esoSkillId: 28025,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 425,
  createdAt: "2026-05-28T16:03:32.309Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = Major Maim (Constant)",
    "<<3>> = 10% (Constant)",
    "<<4>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
