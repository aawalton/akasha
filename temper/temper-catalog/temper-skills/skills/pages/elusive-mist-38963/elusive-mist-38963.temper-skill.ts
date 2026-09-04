import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elusiveMist38963 = {
  id: "019e6f53-a138-7f2f-8b80-be5d62cba63e",
  pageTypeSlug: "temper-skill",
  slug: "elusive-mist-38963",
  title: "Elusive Mist",
  key: "elusive-mist-38963",
  baseName: "Mist Form",
  description:
    '"Disperse into a dark mist, causing the next |cffffff3|r projectiles to deal no damage to you for |cffffff1|r second while you dash forward and reappear at your target location after a short duration.\\n\\nYou gain Major Expedition and Major Evasion for |cffffff4|r seconds after reappearing, increasing your Movement Speed by |cffffff30|r% and reducing damage from area attacks by |cffffff20|r%.\\n\\nCasting again within |cffffff4|r seconds costs |cffffff33|r% more Magicka."',
  icon: "/esoui/art/icons/ability_u26_vampire_05_a.dds",
  esoSkillId: 38963,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 1,
  rank: 9,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
