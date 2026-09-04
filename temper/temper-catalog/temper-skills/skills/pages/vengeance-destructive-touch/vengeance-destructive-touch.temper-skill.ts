import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDestructiveTouch = {
  id: "019e6f53-a8ec-7f4b-8e6f-dcae9a1ba714",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-destructive-touch",
  title: "Vengeance Destructive Touch",
  key: "vengeance-destructive-touch",
  baseName: "Vengeance Destructive Touch",
  description:
    '"Devastate an enemy with an enhanced charge from your staff, dealing |cffffff5008|r Magic Damage and an additional |cffffff12285|r Magic Damage over |cffffff6|r seconds. \\n\\nFlame Touch converts the initial hit into damage over time.\\n\\nFrost Touch converts some of the damage over time into initial damage.\\n\\nShock Touch deals damage more rapidly."',
  icon: "/esoui/art/icons/ability_destructionstaff_005.dds",
  esoSkillId: 241429,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-destruction-staff",
} as const satisfies TemperSkill
