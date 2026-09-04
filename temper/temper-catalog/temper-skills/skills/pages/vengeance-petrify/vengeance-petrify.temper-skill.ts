import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeancePetrify = {
  id: "019e6f53-a94f-7bf2-97e2-ff95fc4675b9",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-petrify",
  title: "Vengeance Petrify",
  key: "vengeance-petrify",
  baseName: "Vengeance Petrify",
  description:
    '"Encase an enemy in molten rock after |cffffff1|r second, stunning them for |cffffff3|r seconds.\\n\\nThis stun cannot be blocked."',
  icon: "/esoui/art/icons/ability_dragonknight_014.dds",
  esoSkillId: 237787,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-earthen-heart",
} as const satisfies TemperSkill
