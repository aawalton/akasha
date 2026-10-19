import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const emeraldMoss85876 = {
  id: "019e6f53-a146-7f0c-949e-cc5803ad3340",
  type: "page-type/temper-skill",
  slug: "emerald-moss-85876",
  title: "Emerald Moss",
  key: "emerald-moss-85876",
  baseName: "Emerald Moss",
  description:
    "Increase your healing done with Green Balance abilities by |cffffff2|r% for each Green Balance ability slotted.\n\nCurrent Bonus: |cffffff0|r%.",
  icon: "/esoui/art/icons/passive_warden_005.dds",
  esoSkillId: 85876,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/passive",
  effects: "jsonl",
  hashPlace: 421,
  createdAt: "2026-05-28T16:03:32.294Z",
  updatedAt: "2026-10-19T22:59:16.876Z",
  equations: [
    "<<1>> = 2% (Constant)",
    "<<2>> = 2 GreenBalance (Green Balance Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
