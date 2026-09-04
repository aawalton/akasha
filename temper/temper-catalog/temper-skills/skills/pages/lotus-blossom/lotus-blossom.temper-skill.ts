import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lotusBlossom = {
  id: "019e6245-a6c0-7f3f-aff9-404e6a2e4283",
  pageTypeSlug: "temper-skill",
  slug: "lotus-blossom",
  title: "Lotus Blossom",
  key: "lotus-blossom",
  baseName: "Lotus Flower",
  description:
    '"Embrace the lotus blessing, causing your Light Attacks to restore 1320 Health and your fully-charged Heavy Attacks to restore 3036 Health to you or a nearby ally for 1 minute.\\n\\nWhile active you gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by 2629."',
  icon: "/esoui/art/icons/ability_warden_009_b.dds",
  esoSkillId: 93914,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
