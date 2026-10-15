import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lotusFlower = {
  id: "019e6f53-a421-7330-a2b9-d2ecf9aadce3",
  type: "page-type/temper-skill",
  slug: "lotus-flower",
  title: "Lotus Flower",
  key: "lotus-flower",
  baseName: "Lotus Flower",
  description:
    "Embrace the lotus blessing, causing your Light Attacks to restore |cffffff1346|r Health and your fully-charged Heavy Attacks to restore |cffffff3097|r Health to you or a nearby ally for |cffffff20|r seconds.\n\nWhile active you gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r.",
  icon: "/esoui/art/icons/ability_warden_009.dds",
  esoSkillId: 85539,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 771,
  createdAt: "2026-05-28T16:03:33.025Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1320 (Constant)",
    "<<2>> = 3036 (Constant)",
    "<<3>> = 17 seconds (Constant)",
    "<<4>> = Major Savagery (Constant)",
    "<<5>> = 17 seconds (Constant)",
    "<<6>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
