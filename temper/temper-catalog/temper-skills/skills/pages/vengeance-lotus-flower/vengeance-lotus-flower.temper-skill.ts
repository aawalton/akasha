import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceLotusFlower = {
  id: "019e6f53-a934-7c60-8403-bc914c269094",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-lotus-flower",
  title: "Vengeance Lotus Flower",
  key: "vengeance-lotus-flower",
  baseName: "Vengeance Lotus Flower",
  description:
    '"Embrace the lotus blessing, granting you Major Mending, Prophecy, and Savagery for |cffffff20|r seconds, increasing your healing done by |cffffff16|r% and Spell and Weapon Critical rating by |cffffff2629|r."',
  icon: "/esoui/art/icons/ability_warden_009.dds",
  esoSkillId: 238067,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-green-balance",
  skillType: "active",
  subcategoryId: "vengeance-warden-green-balance",
} as const satisfies TemperSkill
