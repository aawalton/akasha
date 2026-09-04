import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiantWard = {
  id: "019e6245-a6fb-7b83-985e-5360e448d2ae",
  pageTypeSlug: "temper-skill",
  slug: "radiant-ward",
  title: "Radiant Ward",
  key: "radiant-ward",
  baseName: "Sun Shield",
  description:
    '"Surround yourself with solar rays, dealing 1742 Magic Damage to nearby enemies and applying Minor Maim to them for 10 seconds, reducing their damage done by 5%.\\n\\nThe rays then protect you, granting a damage shield that absorbs up to 4958 damage for 6 seconds, increasing by 20% for each enemy hit, up to 120%. This portion of the ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_templar_radiant_ward.dds",
  esoSkillId: 27514,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
