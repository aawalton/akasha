import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const magmaArmor = {
  id: "019e6f53-a446-73e9-820c-d5943717772d",
  type: "page-type/temper-skill",
  slug: "magma-armor",
  title: "Magma Armor",
  key: "magma-armor",
  baseName: "Magma Armor",
  description:
    "Ignite the molten lava in your veins, limiting incoming damage to |cffffff3|r% of your Max Health for |cffffff15|r seconds.\n\nWhile active, you cannot generate Ultimate.",
  icon: "/esoui/art/icons/ability_dragonknight_018.dds",
  esoSkillId: 15957,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/dragonknight-earthen-heart",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 793,
  createdAt: "2026-05-28T16:03:33.062Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3 (Constant)", "<<2>> = 12 seconds (Constant)"],
} as const satisfies TemperSkill
