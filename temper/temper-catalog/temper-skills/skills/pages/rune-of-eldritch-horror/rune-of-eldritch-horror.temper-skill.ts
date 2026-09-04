import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeOfEldritchHorror = {
  id: "019e6f53-a67f-7cb0-ba01-3ecbdf9fed80",
  pageTypeSlug: "temper-skill",
  slug: "rune-of-eldritch-horror",
  title: "Rune of Eldritch Horror",
  key: "rune-of-eldritch-horror",
  baseName: "Rune of Eldritch Horror",
  description:
    '"Etch an incomprehensible rune on your enemy\'s mind, paralyzing them in fear after a |cffffff1|r second delay, stunning them for |cffffff4|r seconds. This terror applies Minor Vulnerability for |cffffff10|r seconds, increasing their damage taken by |cffffff5|r%.\\n\\nIf used against a monster, the paralyze lasts for |cffffff8|r seconds.\\n\\nThis ability cannot be dodged."',
  icon: "/esoui/art/icons/ability_arcanist_011.dds",
  esoSkillId: 185918,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
