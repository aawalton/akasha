import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeOfUncannyAdoration = {
  id: "019e6245-a71a-7899-8de7-91c5841ceeeb",
  pageTypeSlug: "temper-skill",
  slug: "rune-of-uncanny-adoration",
  title: "Rune of Uncanny Adoration",
  key: "rune-of-uncanny-adoration",
  baseName: "Rune of Eldritch Horror",
  description:
    '"Etch a blasphemous rune on your enemy\'s mind, charming them after a 1 second delay for 4 seconds. This eldritch attraction causes them to move towards the player and applies Minor Vulnerability for 10 seconds, increasing their damage taken by 5%.\\n\\nIf used against a monster, the charm lasts for 8 seconds.\\n\\nThis ability cannot be dodged."',
  icon: "/esoui/art/icons/ability_arcanist_011_a.dds",
  esoSkillId: 40185921,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
