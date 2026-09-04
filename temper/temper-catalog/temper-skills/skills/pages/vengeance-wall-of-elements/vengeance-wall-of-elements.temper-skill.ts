import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceWallOfElements = {
  id: "019e6f53-a9ae-7a7a-b853-8370a24db2a4",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-wall-of-elements",
  title: "Vengeance Wall of Elements",
  key: "vengeance-wall-of-elements",
  baseName: "Vengeance Wall of Elements",
  description:
    '"Slam your staff down to create an elemental field in front of you, dealing |cffffff16692|r Magic Damage to up to 3 enemies in front of you over |cffffff5|r seconds.\\n\\nWall of Fire deals more damage.\\n\\nWall of Frost snares enemies.\\n\\nWall of Storms sets enemies Off Balance."',
  icon: "/esoui/art/icons/ability_destructionstaff_002.dds",
  esoSkillId: 241302,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-destruction-staff",
} as const satisfies TemperSkill
