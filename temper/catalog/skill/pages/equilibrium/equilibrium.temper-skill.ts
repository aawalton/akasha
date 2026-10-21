import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const equilibrium = {
  id: "019e6f53-a195-79bb-9acc-9ef331320058",
  type: "page-type/temper-skill",
  slug: "equilibrium",
  title: "Equilibrium",
  key: "equilibrium",
  baseName: "Equilibrium",
  description:
    "Barter with Oblivion to trade vitality for power, sacrificing your Health in exchange for |cffffff3000|r Magicka.\n\nThe exchange reduces your healing done and damage shield strength by |cffffff50|r% for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_mageguild_003.dds",
  esoSkillId: 31642,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 448,
  createdAt: "2026-05-28T16:03:32.373Z",
  updatedAt: "2026-10-21T01:40:37.191Z",
  equations: ["<<1>> = 3000 (Constant)", "<<2>> = 50% (Constant)", "<<3>> = 4 seconds (Constant)"],
} as const satisfies TemperSkill
