import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healthAvarice = {
  id: "019e6245-a6a0-7e7e-81e1-a4e5c343dda0",
  pageTypeSlug: "temper-skill",
  slug: "health-avarice",
  title: "Health Avarice",
  key: "health-avarice",
  baseName: "Health Avarice",
  description:
    '"Increase your Healing Received by 3% for each Bone Tyrant ability slotted.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/passive_necromancer_007.dds",
  esoSkillId: 116270,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "passive",
  subcategoryId: "necromancer-bone-tyrant",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
