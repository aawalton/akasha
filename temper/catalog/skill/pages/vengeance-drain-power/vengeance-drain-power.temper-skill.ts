import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDrainPower = {
  id: "019e6f53-a8f7-73dd-accf-012d9f9ae628",
  type: "page-type/temper-skill",
  slug: "vengeance-drain-power",
  title: "Vengeance Drain Power",
  key: "vengeance-drain-power",
  baseName: "Vengeance Drain Power",
  description:
    "Siphon the vigor from your enemies' blood, dealing |cffffff8820|r Magic Damage to up to 3 nearby enemies.\n\nAfter activating you gain Minor Force, increasing your Critical Damage done by |cffffff10|r% for |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_013.dds",
  esoSkillId: 237719,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1458,
  createdAt: "2026-05-28T16:03:34.263Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 7875 Magic Damage (Constant)",
    "<<2>> = 10 (Constant)",
    "<<3>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
