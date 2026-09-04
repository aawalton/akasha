import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSacrificialBones = {
  id: "019e6f53-a978-70fd-8318-53d96b4adbb0",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-sacrificial-bones",
  title: "Vengeance Sacrificial Bones",
  key: "vengeance-sacrificial-bones",
  baseName: "Vengeance Sacrificial Bones",
  description:
    '"Dredge up a resentful soul from beneath you to sacrifice as fuel for your attacks, granting you Major Berserk for |cffffff10|r seconds, increasing your damage done by |cffffff10|r%.\\n\\nYou also count as a corpse."',
  icon: "/esoui/art/icons/ability_necromancer_002.dds",
  esoSkillId: 246057,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-grave-lord",
} as const satisfies TemperSkill
