import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const swiftWarrior = {
  id: "019e624a-12e2-7737-b6fb-7cadd38342a0",
  pageTypeSlug: "temper-skill",
  slug: "swift-warrior",
  title: "Swift Warrior",
  key: "swift-warrior",
  baseName: "Swift Warrior",
  description:
    '"Increases your Weapon and Spell Damage by 258.\\n\\nReduces the cost of Sprint by 12% and increases the Movement Speed bonus of Sprint by 10%."',
  icon: "/esoui/art/icons/ability_dragonknight_029.dds",
  esoSkillId: 45312,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 25,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-orc-skills",
  skillType: "passive",
  subcategoryId: "racial-orc-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
