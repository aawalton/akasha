import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const magmaFist = {
  id: "019e6245-a6c6-768f-9a87-cd4897dc6cfc",
  type: "page-type/temper-skill",
  slug: "magma-fist",
  title: "Magma Fist",
  key: "magma-fist",
  baseName: "Superheated Ward",
  description:
    "Draw forth magma from below to hurl at an enemy, dealing 9021 Flame Damage while applying a stack of Heat Shock, which increases the enemy's damage taken by 66 for 7 seconds per stack, up to 3 times.\n\nHitting an enemy at max stacks of Heat Shock with this ability increases the damage done of the next cast of this ability within 6 seconds by 66%, up to once every 6 seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_013_stonefist_b.dds",
  esoSkillId: 31816,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/dragonknight-earthen-heart",
  skillType: "temper-skill-type/active",
  hashPlace: 794,
  createdAt: "2026-05-26T03:13:12.390Z",
  updatedAt: "2026-10-21T01:42:11.846Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = Heat Shock (Constant)",
    "<<3>> = 66 (Constant)",
    "<<4>> = 7 seconds (Constant)",
    "<<8>> = 3 (Constant)",
    "<<5>> = 6 seconds (Constant)",
    "<<6>> = 66% (Constant)",
    "<<7>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
