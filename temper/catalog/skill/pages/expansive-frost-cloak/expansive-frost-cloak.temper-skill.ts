import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const expansiveFrostCloak = {
  id: "019e6245-a679-701f-b122-da4f8b4164ef",
  type: "page-type/temper-skill",
  slug: "expansive-frost-cloak",
  title: "Expansive Frost Cloak",
  key: "expansive-frost-cloak",
  baseName: "Frost Cloak",
  description:
    "Wrap a thick cloak of ice around you and your grouped allies. The ice grants Major Resolve, increasing your Physical and Spell Resistance by 5948 for 20 seconds.",
  icon: "/esoui/art/icons/ability_warden_001_a.dds",
  esoSkillId: 86129,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 477,
  createdAt: "2026-05-26T03:13:12.313Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 5948 (Constant)", "<<2>> = 20 seconds (Constant)"],
} as const satisfies TemperSkill
