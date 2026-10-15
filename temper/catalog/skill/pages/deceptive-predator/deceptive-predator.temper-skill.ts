import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const deceptivePredator = {
  id: "019e6245-a648-7ce5-8107-c17b9c3d2ada",
  type: "page-type/temper-skill",
  slug: "deceptive-predator",
  title: "Deceptive Predator",
  key: "deceptive-predator",
  baseName: "Falcon's Swiftness",
  description:
    "Invoke the spirit of agility to gain Major Expedition for 6 seconds, increasing your Movement Speed by 30%.\n\nGain immunity to snares and immobilizations for 4 seconds.\n\nWhile slotted you gain Minor Evasion, reducing damage from area attacks by 10%.",
  icon: "/esoui/art/icons/ability_warden_016_b.dds",
  esoSkillId: 86044,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 337,
  createdAt: "2026-05-26T03:13:12.264Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 30% (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = Minor Evasion (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
