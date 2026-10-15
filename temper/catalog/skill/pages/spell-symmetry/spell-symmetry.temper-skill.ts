import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const spellSymmetry = {
  id: "019e6238-c317-7a9c-be6e-670d7bc768cc",
  type: "page-type/temper-skill",
  slug: "spell-symmetry",
  title: "Spell Symmetry",
  key: "spell-symmetry",
  baseName: "Equilibrium",
  description:
    "Barter with Oblivion to trade vitality for power, sacrificing your Health in exchange for 3000 Magicka.\n\nAfter the exchange is complete, the cost of your next Magicka ability is reduced by 33% for 5 seconds.\n\nThe exchange reduces your healing done and damage shield strength by 50% for 4 seconds.",
  icon: "/esoui/art/icons/ability_mageguild_003_a.dds",
  esoSkillId: 42263,
  isMorph: true,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1250,
  createdAt: "2026-05-26T02:59:07.671Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3000 (Constant)",
    "<<2>> = 33% (Constant)",
    "<<3>> = 5 seconds (Constant)",
    "<<4>> = 50% (Constant)",
    "<<5>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
