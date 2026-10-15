import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const falconSSwiftness = {
  id: "019e6f53-a1db-7dc3-a1a1-e683b0e64e45",
  type: "page-type/temper-skill",
  slug: "falcon-s-swiftness",
  title: "Falcon's Swiftness",
  key: "falcon-s-swiftness",
  baseName: "Falcon's Swiftness",
  description:
    "Invoke the spirit of agility to gain Major Expedition for |cffffff6|r seconds, increasing your Movement Speed by |cffffff30|r%.\n\nGain immunity to snares and immobilizations for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_warden_016.dds",
  esoSkillId: 86037,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 495,
  createdAt: "2026-05-28T16:03:32.443Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 30% (Constant)",
    "<<3>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
