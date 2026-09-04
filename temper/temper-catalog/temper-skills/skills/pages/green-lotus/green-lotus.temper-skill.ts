import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const greenLotus = {
  id: "019e6245-a697-7c94-9597-f4f59e7ec43a",
  pageTypeSlug: "temper-skill",
  slug: "green-lotus",
  title: "Green Lotus",
  key: "green-lotus",
  baseName: "Lotus Flower",
  description:
    '"Embrace the lotus blessing, causing your Light Attacks to restore 1500 Health and your fully-charged Heavy Attacks to restore 3450 Health to you or 2 nearby allies for 20 seconds.\\n\\nWhile active you gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by 2629."',
  icon: "/esoui/art/icons/ability_warden_009_a.dds",
  esoSkillId: 93911,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
