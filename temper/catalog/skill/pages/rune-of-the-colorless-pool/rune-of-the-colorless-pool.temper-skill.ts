import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runeOfTheColorlessPool = {
  id: "019e6245-a719-779c-bc46-f208d58f040e",
  type: "page-type/temper-skill",
  slug: "rune-of-the-colorless-pool",
  title: "Rune of the Colorless Pool",
  key: "rune-of-the-colorless-pool",
  baseName: "Rune of Eldritch Horror",
  description:
    "Etch an amorphous rune on your enemy's mind, paralyzing them in fear after a 1 second delay, stunning them for 4 seconds. This undimensioned phenomenon applies Minor Vulnerability and Minor Brittle for 20 seconds, increasing their damage taken by 5% and their Critical Damage taken by 10%.\n\nIf used against a monster, the paralyze lasts for 8 seconds.\n\nThis ability cannot be dodged.",
  icon: "/esoui/art/icons/ability_arcanist_011_b.dds",
  esoSkillId: 40183267,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1099,
  createdAt: "2026-05-26T03:13:12.473Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1 second (Constant)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 10% (Constant)",
    "<<6>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
