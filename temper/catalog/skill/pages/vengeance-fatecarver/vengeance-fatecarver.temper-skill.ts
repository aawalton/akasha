import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceFatecarver = {
  id: "019e6f53-a908-72d8-a96d-3af406860e2d",
  type: "page-type/temper-skill",
  slug: "vengeance-fatecarver",
  title: "Vengeance Fatecarver",
  key: "vengeance-fatecarver",
  baseName: "Vengeance Fatecarver",
  description:
    "Harness pure knowledge into a beam of energy that scars the world in front of you. Channel the beam for up to |cffffff4|r seconds, dealing |cffffff8820|r Magic Damage every |cffffff1|r second to up to 3 enemies.\n\nCasting Fatecarver consumes all Crux and increases damage done by |cffffff2940|r per Crux spent.",
  icon: "/esoui/art/icons/ability_arcanist_002.dds",
  esoSkillId: 238174,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1470,
  createdAt: "2026-05-28T16:03:34.280Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 8820 Magic Damage (Constant)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 12 (Constant)",
    "<<5>> = 2940 (Constant)",
  ],
} as const satisfies TemperSkill
