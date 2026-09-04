import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fatecarver = {
  id: "019e6f53-a1e1-73b4-b6e8-34ac89111c83",
  pageTypeSlug: "temper-skill",
  slug: "fatecarver",
  title: "Fatecarver",
  key: "fatecarver",
  baseName: "Fatecarver",
  description:
    '"Harness pure knowledge into a beam of energy that scars the world in front of you. Channel the beam for up to |cffffff4|r seconds, dealing |cffffff3230|r Magic Damage every |cffffff0.3|r seconds to up to 6 enemies.\\n\\nCasting Fatecarver consumes all Crux and increases damage done by |cffffff33|r% per Crux spent.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_arcanist_002.dds",
  esoSkillId: 185805,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
