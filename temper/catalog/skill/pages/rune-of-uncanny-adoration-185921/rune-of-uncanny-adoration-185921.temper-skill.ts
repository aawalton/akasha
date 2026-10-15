import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runeOfUncannyAdoration185921 = {
  id: "019e6f53-a687-745b-ac9b-42a2d9d71acb",
  type: "page-type/temper-skill",
  slug: "rune-of-uncanny-adoration-185921",
  title: "Rune of Uncanny Adoration",
  key: "rune-of-uncanny-adoration-185921",
  baseName: "Rune of Eldritch Horror",
  description:
    "Etch a blasphemous rune on your enemy's mind, charming them after a |cffffff1|r second delay for |cffffff4|r seconds. This eldritch attraction causes them to move towards the player and applies Minor Vulnerability for |cffffff10|r seconds, increasing their damage taken by |cffffff5|r%.\n\nIf used against a monster, the charm lasts for |cffffff8|r seconds.\n\nThis ability cannot be dodged.",
  icon: "/esoui/art/icons/ability_arcanist_011_a.dds",
  esoSkillId: 185921,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1102,
  createdAt: "2026-05-28T16:03:33.639Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1 second (Constant)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
