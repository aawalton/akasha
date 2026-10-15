import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceGrandHealing = {
  id: "019e6f53-a91c-7261-87d3-9aa3b92ab047",
  type: "page-type/temper-skill",
  slug: "vengeance-grand-healing",
  title: "Vengeance Grand Healing",
  key: "vengeance-grand-healing",
  baseName: "Vengeance Grand Healing",
  description:
    "Summon restoring spirits with your staff at the target location, healing up to 3 of you and your allies for |cffffff24096|r Health over |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_004.dds",
  esoSkillId: 241517,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1484,
  createdAt: "2026-05-28T16:03:34.300Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 6 (Constant)", "<<2>> = 23622 (Constant)", "<<3>> = 5 seconds (Constant)"],
} as const satisfies TemperSkill
