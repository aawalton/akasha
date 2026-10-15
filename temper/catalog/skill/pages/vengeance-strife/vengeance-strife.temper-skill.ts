import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceStrife = {
  id: "019e6f53-a994-7c5e-bb63-3402a057452d",
  type: "page-type/temper-skill",
  slug: "vengeance-strife",
  title: "Vengeance Strife",
  key: "vengeance-strife",
  baseName: "Vengeance Strife",
  description:
    "Steal an enemy's life force, dealing |cffffff5565|r Magic Damage and healing you or a nearby ally for |cffffff8033|r Health.",
  icon: "/esoui/art/icons/ability_nightblade_012.dds",
  esoSkillId: 237709,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1568,
  createdAt: "2026-05-28T16:03:34.420Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 5250 Magic Damage (Constant)", "<<2>> = 7875 (Constant)"],
} as const satisfies TemperSkill
