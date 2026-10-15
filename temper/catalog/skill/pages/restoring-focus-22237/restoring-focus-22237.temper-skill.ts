import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const restoringFocus22237 = {
  id: "019e6f53-a62f-7f89-b3f8-48e2a7990e4e",
  type: "page-type/temper-skill",
  slug: "restoring-focus-22237",
  title: "Restoring Focus",
  key: "restoring-focus-22237",
  baseName: "Rune Focus",
  description:
    "Create a rune of celestial protection and gain Major Resolve for |cffffff20|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r. You also recover |cffffff242|r Stamina every |cffffff1|r second over the duration.\n\nWhile the rune is active you heal for |cffffff518|r Health every |cffffff1|r second, scaling off your Max Health. Standing within the rune increases the healing done by |cffffff200|r%.",
  icon: "/esoui/art/icons/ability_templar_uninterrupted_focus.dds",
  esoSkillId: 22237,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1055,
  createdAt: "2026-05-28T16:03:33.551Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Resolve (Constant)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 5948 (Constant)",
    "<<4>> = 242 (Constant)",
    "<<5>> = 1 second (Constant)",
    "<<6>> = 0.0249476 Health + 0.712153 (Health, Heal, SingleTarget, DOT, 20s duration, 1s tick, R2 = 0.999987)",
    "<<7>> = 1 second (Constant)",
    "<<8>> = 200% (Constant)",
  ],
} as const satisfies TemperSkill
