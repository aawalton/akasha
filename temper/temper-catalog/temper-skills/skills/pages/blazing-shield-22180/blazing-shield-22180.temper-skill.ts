import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blazingShield22180 = {
  id: "019e6f53-9f25-738a-88e6-488ea1f3d112",
  pageTypeSlug: "temper-skill",
  slug: "blazing-shield-22180",
  title: "Blazing Shield",
  key: "blazing-shield-22180",
  baseName: "Sun Shield",
  description:
    '"Surround yourself with solar rays, applying Minor Maim to nearby enemies for |cffffff10|r seconds, reducing their damage done by |cffffff5|r%.\\n\\nYou gain a damage shield that absorbs up to |cffffff6802|r damage for |cffffff6|r seconds, increasing by |cffffff10|r% for each enemy hit, up to |cffffff60|r%. This ability scales off your Max Health.\\n\\nWhen the shield expires it explodes, dealing |cffffff37|r% of damage absorbed as Magic Damage to nearby enemies."',
  icon: "/esoui/art/icons/ability_templar_blazing_shield.dds",
  esoSkillId: 22180,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
