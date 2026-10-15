import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reaperSMark = {
  id: "019e6f53-a5bd-78f5-8605-b45363ff64ca",
  type: "page-type/temper-skill",
  slug: "reaper-s-mark",
  title: "Reaper's Mark",
  key: "reaper-s-mark",
  baseName: "Mark Target",
  description:
    "Expose an enemy's weaknesses by applying Major Breach to them, reducing Physical Resistance and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.\n\nWhen a marked enemy dies, you heal to full Health and gain Major Berserk, increasing your damage done by |cffffff10|r% for |cffffff10|r seconds.\n\nYou can only have one Reaper's Mark active at a time.",
  icon: "/esoui/art/icons/ability_nightblade_014_a.dds",
  esoSkillId: 36967,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 992,
  createdAt: "2026-05-28T16:03:33.437Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Breach (Constant)",
    "<<2>> = 5948 (Constant)",
    "<<3>> = 17 seconds (Constant)",
    "<<4>> = 10% (Constant)",
    "<<5>> = 7 seconds (Constant)",
    "<<6>> = Reaper's Mark (Constant)",
  ],
} as const satisfies TemperSkill
