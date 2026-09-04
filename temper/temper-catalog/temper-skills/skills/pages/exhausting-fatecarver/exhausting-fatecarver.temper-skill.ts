import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const exhaustingFatecarver = {
  id: "019e6245-a677-7edb-a0ca-ca62e83ca80b",
  pageTypeSlug: "temper-skill",
  slug: "exhausting-fatecarver",
  title: "Exhausting Fatecarver",
  key: "exhausting-fatecarver",
  baseName: "Fatecarver",
  description:
    '"Harness pure knowledge into a beam of energy that scars the world in front of you. Channel the beam for up to 4 seconds, dealing 879 Magic Damage every 0.3 seconds to up to 6 enemies and snares them by 15%.\\n\\nCasting Exhausting Fatecarver consumes all Crux and increases damage done by 33%, duration by 0.3 seconds, and snare by 15% per Crux spent.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_arcanist_002_a.dds",
  esoSkillId: 40183122,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
