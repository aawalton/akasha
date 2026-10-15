import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const petrify = {
  id: "019e6f53-a4f7-7e16-905a-62ec327f4067",
  type: "page-type/temper-skill",
  slug: "petrify",
  title: "Petrify",
  key: "petrify",
  baseName: "Petrify",
  description:
    "Encase an enemy in molten rock, reducing their movement speed by |cffffff50|r% for |cffffff1|r second. Upon completion, the target is stunned for |cffffff4|r seconds, or |cffffff8|r seconds against monsters.\n\nThis stun cannot be blocked.\n\nThe molten rock melts through the enemy's armor and applies Minor Breach for |cffffff10|r seconds, reducing Armor by |cffffff2974|r.",
  icon: "/esoui/art/icons/ability_dragonknight_014.dds",
  esoSkillId: 29037,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/dragonknight-earthen-heart",
  skillType: "temper-skill-type/active",
  hashPlace: 888,
  createdAt: "2026-05-28T16:03:33.239Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 50% (Constant)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = 8 seconds (Constant)",
    "<<5>> = Minor Breach (Constant)",
    "<<6>> = 10 seconds (Constant)",
    "<<7>> = 2974 (Constant)",
  ],
} as const satisfies TemperSkill
