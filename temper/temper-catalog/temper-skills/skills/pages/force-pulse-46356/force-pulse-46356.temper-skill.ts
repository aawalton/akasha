import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const forcePulse46356 = {
  id: "019e6f53-a227-7ebb-9c36-d57308e90fcb",
  pageTypeSlug: "temper-skill",
  slug: "force-pulse-46356",
  title: "Force Pulse",
  key: "force-pulse-46356",
  baseName: "Force Shock",
  description:
    '"Focus all the elemental energies with your staff and blast an enemy for |cffffff2422|r Flame Damage, |cffffff2422|r Frost Damage, and |cffffff2422|r Shock Damage. \\n\\nUp to 2 nearby enemies will take \\n|cffffff8342|r Magic Damage if they were already afflicted with a status effect."',
  icon: "/esoui/art/icons/ability_destructionstaff_001b.dds",
  esoSkillId: 46356,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
