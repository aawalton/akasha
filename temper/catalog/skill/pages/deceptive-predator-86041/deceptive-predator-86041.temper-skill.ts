import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const deceptivePredator86041 = {
  id: "019e6f53-a0a4-7ef0-ad4e-3548fcbdb9e0",
  type: "page-type/temper-skill",
  slug: "deceptive-predator-86041",
  title: "Deceptive Predator",
  key: "deceptive-predator-86041",
  baseName: "Falcon's Swiftness",
  description:
    "Invoke the spirit of agility to gain Major Expedition for |cffffff6|r seconds, increasing your Movement Speed by |cffffff30|r%.\n\nGain immunity to snares and immobilizations for |cffffff4|r seconds.\n\nWhile slotted you gain Minor Evasion, reducing damage from area attacks by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_warden_016_b.dds",
  esoSkillId: 86041,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 338,
  createdAt: "2026-05-28T16:03:32.132Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 30% (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = Minor Evasion (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
