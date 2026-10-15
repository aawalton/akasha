import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDestructiveTouch = {
  id: "019e6f53-a8ec-7f4b-8e6f-dcae9a1ba714",
  type: "page-type/temper-skill",
  slug: "vengeance-destructive-touch",
  title: "Vengeance Destructive Touch",
  key: "vengeance-destructive-touch",
  baseName: "Vengeance Destructive Touch",
  description:
    "Devastate an enemy with an enhanced charge from your staff, dealing |cffffff5008|r Magic Damage and an additional |cffffff12285|r Magic Damage over |cffffff6|r seconds. \n\nFlame Touch converts the initial hit into damage over time.\n\nFrost Touch converts some of the damage over time into initial damage.\n\nShock Touch deals damage more rapidly.",
  icon: "/esoui/art/icons/ability_destructionstaff_005.dds",
  esoSkillId: 241429,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1451,
  createdAt: "2026-05-28T16:03:34.252Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4725 Magic Damage (Constant)",
    "<<2>> = 12285 (Constant)",
    "<<3>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
