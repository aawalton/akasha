import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceLowSlash = {
  id: "019e6f53-a936-7345-b7fd-66a82b7cdfb6",
  type: "page-type/temper-skill",
  slug: "vengeance-low-slash",
  title: "Vengeance Low Slash",
  key: "vengeance-low-slash",
  baseName: "Vengeance Low Slash",
  description:
    "Surprise an enemy with a deep lunge, dealing |cffffff6678|r Physical Damage and afflicting them with Minor Maim, reducing their damage done by |cffffff5|r% for |cffffff15|r seconds.",
  icon: "/esoui/art/icons/ability_1handed_001.dds",
  esoSkillId: 240558,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 1502,
  createdAt: "2026-05-28T16:03:34.326Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6300 Physical Damage (Constant)",
    "<<2>> = Minor Maim (Constant)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
