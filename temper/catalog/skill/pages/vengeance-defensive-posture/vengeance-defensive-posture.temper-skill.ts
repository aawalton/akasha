import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDefensivePosture = {
  id: "019e6f53-a8ea-7fd5-8ac1-68d192731ce9",
  type: "page-type/temper-skill",
  slug: "vengeance-defensive-posture",
  title: "Vengeance Defensive Posture",
  key: "vengeance-defensive-posture",
  baseName: "Vengeance Defensive Posture",
  description:
    "Bolster your defenses, gaining a damage shield that absorbs up to |cffffff6802|r damage for |cffffff6|r seconds.  This portion of the ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_1handed_004.dds",
  esoSkillId: 240560,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 1450,
  createdAt: "2026-05-28T16:03:34.250Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3 Health (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
