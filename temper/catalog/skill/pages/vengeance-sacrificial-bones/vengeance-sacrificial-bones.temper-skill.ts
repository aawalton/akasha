import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceSacrificialBones = {
  id: "019e6f53-a978-70fd-8318-53d96b4adbb0",
  type: "page-type/temper-skill",
  slug: "vengeance-sacrificial-bones",
  title: "Vengeance Sacrificial Bones",
  key: "vengeance-sacrificial-bones",
  baseName: "Vengeance Sacrificial Bones",
  description:
    "Dredge up a resentful soul from beneath you to sacrifice as fuel for your attacks, granting you Major Berserk for |cffffff10|r seconds, increasing your damage done by |cffffff10|r%.\n\nYou also count as a corpse.",
  icon: "/esoui/art/icons/ability_necromancer_002.dds",
  esoSkillId: 246057,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 1548,
  createdAt: "2026-05-28T16:03:34.392Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Berserk (Constant)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
