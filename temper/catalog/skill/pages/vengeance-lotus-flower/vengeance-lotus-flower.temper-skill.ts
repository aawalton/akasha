import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceLotusFlower = {
  id: "019e6f53-a934-7c60-8403-bc914c269094",
  type: "page-type/temper-skill",
  slug: "vengeance-lotus-flower",
  title: "Vengeance Lotus Flower",
  key: "vengeance-lotus-flower",
  baseName: "Vengeance Lotus Flower",
  description:
    "Embrace the lotus blessing, granting you Major Mending, Prophecy, and Savagery for |cffffff20|r seconds, increasing your healing done by |cffffff16|r% and Spell and Weapon Critical rating by |cffffff2629|r.",
  icon: "/esoui/art/icons/ability_warden_009.dds",
  esoSkillId: 238067,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 1501,
  createdAt: "2026-05-28T16:03:34.324Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 20 seconds (Constant)", "<<2>> = 16% (Constant)", "<<3>> = 2629 (Constant)"],
} as const satisfies TemperSkill
