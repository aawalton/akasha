import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const repentance26821 = {
  id: "019e6f53-a604-78c8-a547-83f71befc0a3",
  type: "page-type/temper-skill",
  slug: "repentance-26821",
  title: "Repentance",
  key: "repentance-26821",
  baseName: "Restoring Aura",
  description:
    "Consecrate the souls of the fallen, healing you and your allies for |cffffff3060|r Health and restoring |cffffff3000|r Stamina to you for each corpse nearby.\n\nWhile slotted on either bar, you gain Minor Fortitude, Minor Endurance, and Minor Intellect, increasing your Health, Stamina, and Magicka Recovery by |cffffff15|r%.",
  icon: "/esoui/art/icons/ability_templar_persistant_sigil.dds",
  esoSkillId: 26821,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1030,
  createdAt: "2026-05-28T16:03:33.508Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2700 (Constant)",
    "<<2>> = 2700 (Constant)",
    "<<3>> = Minor Fortitude (Constant)",
    "<<4>> = Minor Endurance (Constant)",
    "<<5>> = Minor Intellect (Constant)",
    "<<6>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
