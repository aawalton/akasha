import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runeOfTheColorlessPool183267 = {
  id: "019e6f53-a684-7034-bee7-d203c2925bf2",
  type: "page-type/temper-skill",
  slug: "rune-of-the-colorless-pool-183267",
  title: "Rune of the Colorless Pool",
  key: "rune-of-the-colorless-pool-183267",
  baseName: "Rune of Eldritch Horror",
  description:
    "Etch an amorphous rune on your enemy's mind, paralyzing them in fear after a |cffffff1|r second delay, stunning them for |cffffff4|r seconds. This undimensioned phenomenon applies Minor Vulnerability and Minor Brittle for |cffffff20|r seconds, increasing their damage taken by |cffffff5|r% and their Critical Damage taken by |cffffff10|r%.\n\nIf used against a monster, the paralyze lasts for |cffffff8|r seconds.\n\nThis ability cannot be dodged.",
  icon: "/esoui/art/icons/ability_arcanist_011_b.dds",
  esoSkillId: 183267,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1100,
  createdAt: "2026-05-28T16:03:33.636Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1 second (Constant)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 14 seconds (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 10% (Constant)",
    "<<6>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
