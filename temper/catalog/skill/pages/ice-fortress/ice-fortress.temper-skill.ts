import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const iceFortress = {
  id: "019e6245-a6aa-73a2-b2e9-5d96f3a6ace8",
  type: "page-type/temper-skill",
  slug: "ice-fortress",
  title: "Ice Fortress",
  key: "ice-fortress",
  baseName: "Frost Cloak",
  description:
    "Wrap a thick cloak of ice around you and your grouped allies. The ice grants Major Resolve, increasing your Physical and Spell Resistance by 5948 for 30 seconds.\n\nYou gain Minor Protection, reducing your damage taken by 5% for 30 seconds.",
  icon: "/esoui/art/icons/ability_warden_001_b.dds",
  esoSkillId: 86133,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 652,
  createdAt: "2026-05-26T03:13:12.362Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5948 (Constant)",
    "<<2>> = 30 seconds (Constant)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 30 seconds (Constant)",
  ],
} as const satisfies TemperSkill
