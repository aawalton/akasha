import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const phantasmalEscape35419 = {
  id: "019e6f53-a4fb-7c83-bb72-045814d860a4",
  pageTypeSlug: "temper-skill",
  slug: "phantasmal-escape-35419",
  title: "Phantasmal Escape",
  key: "phantasmal-escape-35419",
  baseName: "Blur",
  description:
    '"Surround yourself in a phantasmic aura to gain Major Evasion, reducing damage from area attacks by |cffffff20|r% for |cffffff20|r seconds.\\n\\nActivating this ability removes all snares and immobilizations from you and grants immunity to them for |cffffff4|r seconds.\\n\\nWhile active, taking direct damage reduces the cost of your next Roll Dodge by |cffffff10|r%, up to a maximum of |cffffff100|r%. This effect can stack up to once every half second."',
  icon: "/esoui/art/icons/ability_nightblade_009_b.dds",
  esoSkillId: 35419,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
