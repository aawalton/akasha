import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vibrantShroud28311 = {
  id: "019e6f53-a9c2-7f83-aefe-4da3ade87974",
  type: "page-type/temper-skill",
  slug: "vibrant-shroud-28311",
  title: "Vibrant Shroud",
  key: "vibrant-shroud-28311",
  baseName: "Encase",
  description:
    "Call forth a Daedric shroud from the Colored Rooms to heal you and your allies and enfeeble foes in front of you. \n\nYou and allies in the area are healed for |cffffff8489|r Health and receive Minor Vitality, increasing your healing received and damage shield strength by |cffffff6|r% for |cffffff10|r seconds.\n\nEnemies are afflicted with Major Maim, reducing their damage done by |cffffff10|r% for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_crushing_winds.dds",
  esoSkillId: 28311,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 1597,
  createdAt: "2026-05-28T16:03:34.466Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.116213 MaxStat + 1.22023 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = Minor Vitality (Constant)",
    "<<3>> = 6% (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = Major Maim (Constant)",
    "<<6>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
