import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const restoringFocus = {
  id: "019e6245-a70f-7ebe-9bca-f7264db1654b",
  type: "page-type/temper-skill",
  slug: "restoring-focus",
  title: "Restoring Focus",
  key: "restoring-focus",
  baseName: "Rune Focus",
  description:
    "Create a rune of celestial protection and gain Major Resolve for 20 seconds, increasing your Physical Resistance and Spell Resistance by 5948. You also recover 242 Stamina every 1 second over the duration.\n\nWhile the rune is active you heal for 413 Health every 1 second, scaling off your Max Health. Standing within the rune increases the healing done by 200%.",
  icon: "/esoui/art/icons/ability_templar_uninterrupted_focus.dds",
  esoSkillId: 23985,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1054,
  createdAt: "2026-05-26T03:13:12.463Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Resolve (Constant)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 5948 (Constant)",
    "<<4>> = 242 (Constant)",
    "<<5>> = 1 second (Constant)",
    "<<6>> = 0.0257426 Health + 0.928549 (Health, Heal, SingleTarget, DOT, 20s duration, 1s tick, R2 = 0.99997)",
    "<<7>> = 1 second (Constant)",
    "<<8>> = 200% (Constant)",
  ],
} as const satisfies TemperSkill
