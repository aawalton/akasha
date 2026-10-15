import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const greenLotus = {
  id: "019e6245-a697-7c94-9597-f4f59e7ec43a",
  type: "page-type/temper-skill",
  slug: "green-lotus",
  title: "Green Lotus",
  key: "green-lotus",
  baseName: "Lotus Flower",
  description:
    "Embrace the lotus blessing, causing your Light Attacks to restore 1500 Health and your fully-charged Heavy Attacks to restore 3450 Health to you or 2 nearby allies for 20 seconds.\n\nWhile active you gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by 2629.",
  icon: "/esoui/art/icons/ability_warden_009_a.dds",
  esoSkillId: 93911,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 579,
  createdAt: "2026-05-26T03:13:12.343Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1500 (Constant)",
    "<<2>> = 3450 (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = Major Savagery (Constant)",
    "<<5>> = 20 seconds (Constant)",
    "<<6>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
