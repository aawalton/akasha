import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magmaFist = {
  id: "019e6245-a6c6-768f-9a87-cd4897dc6cfc",
  pageTypeSlug: "temper-skill",
  slug: "magma-fist",
  title: "Magma Fist",
  key: "magma-fist",
  baseName: "Superheated Ward",
  description:
    '"Draw forth magma from below to hurl at an enemy, dealing 9021 Flame Damage while applying a stack of Heat Shock, which increases the enemy\'s damage taken by 66 for 7 seconds per stack, up to 3 times.\\n\\nHitting an enemy at max stacks of Heat Shock with this ability increases the damage done of the next cast of this ability within 6 seconds by 66%, up to once every 6 seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_013_stonefist_b.dds",
  esoSkillId: 31816,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
