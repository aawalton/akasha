import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeOfTheColorlessPool = {
  id: "019e6245-a719-779c-bc46-f208d58f040e",
  pageTypeSlug: "temper-skill",
  slug: "rune-of-the-colorless-pool",
  title: "Rune of the Colorless Pool",
  key: "rune-of-the-colorless-pool",
  baseName: "Rune of Eldritch Horror",
  description:
    '"Etch an amorphous rune on your enemy\'s mind, paralyzing them in fear after a 1 second delay, stunning them for 4 seconds. This undimensioned phenomenon applies Minor Vulnerability and Minor Brittle for 20 seconds, increasing their damage taken by 5% and their Critical Damage taken by 10%.\\n\\nIf used against a monster, the paralyze lasts for 8 seconds.\\n\\nThis ability cannot be dodged."',
  icon: "/esoui/art/icons/ability_arcanist_011_b.dds",
  esoSkillId: 40183267,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
