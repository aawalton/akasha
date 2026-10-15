import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const channeledFocus22240 = {
  id: "019e6f53-9fd8-7dc1-8f29-07229ff70240",
  type: "page-type/temper-skill",
  slug: "channeled-focus-22240",
  title: "Channeled Focus",
  key: "channeled-focus-22240",
  baseName: "Rune Focus",
  description:
    "Create a rune of celestial protection and gain Major Resolve for |cffffff25|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r. You also recover |cffffff242|r Magicka every |cffffff1|r second over the duration.\n\nWhile the rune is active you heal for |cffffff402|r Health every |cffffff1|r second, scaling off your Max Health. Standing within the rune increases the healing done by |cffffff200|r%.",
  icon: "/esoui/art/icons/ability_templar_channeled_focus.dds",
  esoSkillId: 22240,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 205,
  createdAt: "2026-05-28T16:03:31.928Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Resolve (Constant)",
    "<<2>> = 22 seconds (Constant)",
    "<<3>> = 5948 (Constant)",
    "<<4>> = 242 (Constant)",
    "<<5>> = 1 second (Constant)",
    "<<6>> = 0.02 Health (Health, Heal, SingleTarget, DOT, 22s duration, 1s tick, R2 = 1)",
    "<<7>> = 1 second (Constant)",
    "<<8>> = 200% (Constant)",
  ],
} as const satisfies TemperSkill
