import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceLacerate = {
  id: "019e6f53-a92c-73f6-b8b5-ed508cce506b",
  type: "page-type/temper-skill",
  slug: "vengeance-lacerate",
  title: "Vengeance Lacerate",
  key: "vengeance-lacerate",
  baseName: "Vengeance Lacerate",
  description:
    "Slash up to 3 enemies in front of you, causing them to bleed for |cffffff43785|r Bleed Damage over |cffffff8|r seconds. You heal |cffffff3213|r Health every time damage is dealt.",
  icon: "/esoui/art/icons/ability_dualwield_006.dds",
  esoSkillId: 241236,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-dual-wield",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1495,
  createdAt: "2026-05-28T16:03:34.316Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 12 (Constant)",
    "<<2>> = 43785 Bleed Damage (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 3150 (Constant)",
  ],
} as const satisfies TemperSkill
