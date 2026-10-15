import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runeFocus = {
  id: "019e6f53-a67a-78a7-9fb3-92d191b62d65",
  type: "page-type/temper-skill",
  slug: "rune-focus",
  title: "Rune Focus",
  key: "rune-focus",
  baseName: "Rune Focus",
  description:
    "Create a rune of celestial protection and gain Major Resolve for |cffffff20|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r. \n\nWhile the rune is active you heal for |cffffff402|r Health every |cffffff1|r second, scaling off your Max Health. Standing within the rune increases the healing done by |cffffff200|r%.",
  icon: "/esoui/art/icons/ability_templar_rune_focus.dds",
  esoSkillId: 22234,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1095,
  createdAt: "2026-05-28T16:03:33.626Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Resolve (Constant)",
    "<<2>> = 17 seconds (Constant)",
    "<<3>> = 5948 (Constant)",
    "<<4>> = 0.0200428 Health - 1.48048 (Health, Heal, SingleTarget, DOT, 17s duration, 1s tick, R2 = 0.999973)",
    "<<5>> = 1 second (Constant)",
    "<<6>> = 200% (Constant)",
  ],
} as const satisfies TemperSkill
