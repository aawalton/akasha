import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hemorrhage = {
  id: "019e6245-a6a3-7f87-9a00-6dd90defcfd5",
  pageTypeSlug: "temper-skill",
  slug: "hemorrhage",
  title: "Hemorrhage",
  key: "hemorrhage",
  baseName: "Hemorrhage",
  description:
    '"Increases your Critical Damage by 10%. \\n\\nDealing Critical Damage grants you and your group Minor Savagery, increasing your Weapon Critical rating by 1314 for 20 seconds."',
  icon: "/esoui/art/icons/passive_weapon_017.dds",
  esoSkillId: 45060,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-assassination",
  skillType: "passive",
  subcategoryId: "nightblade-assassination",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
