import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const zenasEmpoweringDisc = {
  id: "019e6245-a772-7f0f-b8cd-6c78b0bcec0a",
  type: "page-type/temper-skill",
  slug: "zenas-empowering-disc",
  title: "Zenas' Empowering Disc",
  key: "zenas-empowering-disc",
  baseName: "Arcanist's Domain",
  description:
    "Draw forth your tome and invoke the enigmatum of Morian Zenas to conjure a vortex of eldritch power. Entering this vortex grants you and your allies Minor Courage, Minor Fortitude, Minor Intellect, and Minor Endurance, increasing your Weapon and Spell Damage by 215 and your Health, Magicka, and Stamina Recovery by 15%.\n\nThese effects cling to you and your allies for up to 10 seconds after leaving the vortex.",
  icon: "/esoui/art/icons/ability_arcanist_017_a.dds",
  esoSkillId: 40186229,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 1634,
  createdAt: "2026-05-26T03:13:12.562Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Courage (Constant)",
    "<<2>> = Minor Fortitude (Constant)",
    "<<3>> = Minor Intellect (Constant)",
    "<<4>> = Minor Endurance (Constant)",
    "<<5>> = 215 (Constant)",
    "<<6>> = 15% (Constant)",
    "<<7>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
