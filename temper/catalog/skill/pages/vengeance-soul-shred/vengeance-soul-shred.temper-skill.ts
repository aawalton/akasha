import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceSoulShred = {
  id: "019e6f53-a98d-781b-9ea1-68e93999c69d",
  type: "page-type/temper-skill",
  slug: "vengeance-soul-shred",
  title: "Vengeance Soul Shred",
  key: "vengeance-soul-shred",
  baseName: "Vengeance Soul Shred",
  description:
    "Ravage up to 3 nearby enemies' souls with a night rune, dealing |cffffff20285|r Magic Damage and stunning them for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_018.dds",
  esoSkillId: 237722,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-nightblade-siphoning",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1563,
  createdAt: "2026-05-28T16:03:34.413Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 (Constant)",
    "<<2>> = 18112 Magic Damage (Constant)",
    "<<3>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
