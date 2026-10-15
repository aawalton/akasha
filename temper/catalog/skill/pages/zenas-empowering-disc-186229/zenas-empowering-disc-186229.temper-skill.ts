import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const zenasEmpoweringDisc186229 = {
  id: "019e6f53-aa0f-73b6-a13e-fa26addd0510",
  type: "page-type/temper-skill",
  slug: "zenas-empowering-disc-186229",
  title: "Zenas' Empowering Disc",
  key: "zenas-empowering-disc-186229",
  baseName: "Arcanist's Domain",
  description:
    "Draw forth your tome and invoke the enigmatum of Morian Zenas to conjure a vortex of eldritch power. Entering this vortex grants you and your allies Minor Courage, Minor Fortitude, Minor Intellect, and Minor Endurance, increasing your Weapon and Spell Damage by |cffffff215|r and your Health, Magicka, and Stamina Recovery by |cffffff15|r%.\n\nThese effects cling to you and your allies for up to |cffffff10|r seconds after leaving the vortex.",
  icon: "/esoui/art/icons/ability_arcanist_017_a.dds",
  esoSkillId: 186229,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 1635,
  createdAt: "2026-05-28T16:03:34.543Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Courage (Constant)",
    "<<2>> = Minor Fortitude (Constant)",
    "<<3>> = Minor Intellect (Constant)",
    "<<4>> = Minor Endurance (Constant)",
    "<<5>> = 215 (Constant)",
    "<<6>> = 15% (Constant)",
    "<<7>> = 7 seconds (Constant)",
  ],
} as const satisfies TemperSkill
