import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const greenLotus85854 = {
  id: "019e6f53-a2b0-757d-b048-bb65fab9fe2b",
  type: "page-type/temper-skill",
  slug: "green-lotus-85854",
  title: "Green Lotus",
  key: "green-lotus-85854",
  baseName: "Lotus Flower",
  description:
    "Embrace the lotus blessing, causing your Light Attacks to restore |cffffff1530|r Health and your fully-charged Heavy Attacks to restore |cffffff3519|r Health to you or |cffffff2|r nearby allies for |cffffff20|r seconds.\n\nWhile active you gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r.",
  icon: "/esoui/art/icons/ability_warden_009_a.dds",
  esoSkillId: 85854,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 580,
  createdAt: "2026-05-28T16:03:32.656Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1401 (Constant)",
    "<<2>> = 3360 (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = Major Savagery (Constant)",
    "<<5>> = 20 seconds (Constant)",
    "<<6>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
