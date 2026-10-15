import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lotusBlossom85855 = {
  id: "019e6f53-a41c-7d6c-ab1a-52b52194ee15",
  type: "page-type/temper-skill",
  slug: "lotus-blossom-85855",
  title: "Lotus Blossom",
  key: "lotus-blossom-85855",
  baseName: "Lotus Flower",
  description:
    "Embrace the lotus blessing, causing your Light Attacks to restore |cffffff1346|r Health and your fully-charged Heavy Attacks to restore |cffffff3097|r Health to you or a nearby ally for |cffffff1|r minute.\n\nWhile active you gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r.",
  icon: "/esoui/art/icons/ability_warden_009_b.dds",
  esoSkillId: 85855,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 768,
  createdAt: "2026-05-28T16:03:33.020Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1320 (Constant)",
    "<<2>> = 3036 (Constant)",
    "<<3>> = 57 seconds (Constant)",
    "<<4>> = Major Savagery (Constant)",
    "<<5>> = 57 seconds (Constant)",
    "<<6>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
