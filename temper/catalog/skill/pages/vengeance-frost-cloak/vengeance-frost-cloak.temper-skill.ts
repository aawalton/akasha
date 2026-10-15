import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceFrostCloak = {
  id: "019e6f53-a915-7079-b00f-06b0c44b2551",
  type: "page-type/temper-skill",
  slug: "vengeance-frost-cloak",
  title: "Vengeance Frost Cloak",
  key: "vengeance-frost-cloak",
  baseName: "Vengeance Frost Cloak",
  description:
    "Wrap a thick cloak of ice around yourself and up to 2 grouped allies. The ice grants Major Resolve, increasing your Physical and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_warden_001.dds",
  esoSkillId: 238076,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 1479,
  createdAt: "2026-05-28T16:03:34.293Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 5948 (Constant)", "<<2>> = 20 seconds (Constant)"],
} as const satisfies TemperSkill
