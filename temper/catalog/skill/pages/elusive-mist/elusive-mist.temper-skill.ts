import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elusiveMist = {
  id: "019e6251-4cae-78d6-abf3-9309c7ba121b",
  type: "page-type/temper-skill",
  slug: "elusive-mist",
  title: "Elusive Mist",
  key: "elusive-mist",
  baseName: "Mist Form",
  description:
    "Disperse into a dark mist, causing the next 3 projectiles to deal no damage to you for 1 second while you dash forward and reappear at your target location after a short duration.\n\nYou gain Major Expedition and Major Evasion for 4 seconds after reappearing, increasing your Movement Speed by 30% and reducing damage from area attacks by 20%.\n\nCasting again within 4 seconds costs 33% more Magicka.",
  icon: "/esoui/art/icons/ability_u26_vampire_05_a.dds",
  esoSkillId: 41815,
  isMorph: true,
  learnedLevel: 9,
  lineRankNeeded: 9,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 418,
  createdAt: "2026-05-26T03:25:55.758Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1 second (Constant)",
    "<<2>> = Major Expedition (Constant)",
    "<<3>> = Major Evasion (Constant)",
    "<<4>> = 4 seconds (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = 20% (Constant)",
    "<<7>> = 4 seconds (Constant)",
    "<<8>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
