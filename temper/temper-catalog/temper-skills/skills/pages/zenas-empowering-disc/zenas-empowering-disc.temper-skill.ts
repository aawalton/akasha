import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const zenasEmpoweringDisc = {
  id: "019e6245-a772-7f0f-b8cd-6c78b0bcec0a",
  pageTypeSlug: "temper-skill",
  slug: "zenas-empowering-disc",
  title: "Zenas' Empowering Disc",
  key: "zenas-empowering-disc",
  baseName: "Arcanist's Domain",
  description:
    '"Draw forth your tome and invoke the enigmatum of Morian Zenas to conjure a vortex of eldritch power. Entering this vortex grants you and your allies Minor Courage, Minor Fortitude, Minor Intellect, and Minor Endurance, increasing your Weapon and Spell Damage by 215 and your Health, Magicka, and Stamina Recovery by 15%.\\n\\nThese effects cling to you and your allies for up to 10 seconds after leaving the vortex."',
  icon: "/esoui/art/icons/ability_arcanist_017_a.dds",
  esoSkillId: 40186229,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
