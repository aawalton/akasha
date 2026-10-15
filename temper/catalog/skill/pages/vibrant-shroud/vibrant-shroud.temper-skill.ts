import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vibrantShroud = {
  id: "019e6245-a764-7a56-bc57-07920b18f1f6",
  type: "page-type/temper-skill",
  slug: "vibrant-shroud",
  title: "Vibrant Shroud",
  key: "vibrant-shroud",
  baseName: "Encase",
  description:
    "Call forth a Daedric shroud from the Colored Rooms to heal you and your allies and enfeeble foes in front of you. \n\nYou and allies in the area are healed for 2700 Health and receive Minor Vitality, increasing your healing received and damage shield strength by 6% for 10 seconds.\n\nEnemies are afflicted with Major Maim, reducing their damage done by 10% for 10 seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_crushing_winds.dds",
  esoSkillId: 30107,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 1596,
  createdAt: "2026-05-26T03:13:12.548Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.120048029 MaxStat + 1.26049759 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = Minor Vitality (Constant)",
    "<<3>> = 6% (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = Major Maim (Constant)",
    "<<6>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
