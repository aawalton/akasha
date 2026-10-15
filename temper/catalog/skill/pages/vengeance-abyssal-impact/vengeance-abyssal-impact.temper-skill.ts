import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceAbyssalImpact = {
  id: "019e6f53-a8ac-7e51-8d47-689fea1822f1",
  type: "page-type/temper-skill",
  slug: "vengeance-abyssal-impact",
  title: "Vengeance Abyssal Impact",
  key: "vengeance-abyssal-impact",
  baseName: "Vengeance Abyssal Impact",
  description:
    "Infuse your arm with abyssal magic to form tentacles that lash out at your foes, dealing |cffffff10143|r Physical Damage to up to 3 enemies and immobilize them for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_arcanist_003.dds",
  esoSkillId: 238189,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1407,
  createdAt: "2026-05-28T16:03:34.188Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 9056 Physical Damage (Constant)",
    "<<2>> = 6 (Constant)",
    "<<3>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
