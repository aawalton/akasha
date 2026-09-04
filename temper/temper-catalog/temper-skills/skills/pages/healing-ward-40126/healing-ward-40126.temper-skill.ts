import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healingWard40126 = {
  id: "019e6f53-a2ef-7d64-a80e-b7579614d1e0",
  pageTypeSlug: "temper-skill",
  slug: "healing-ward-40126",
  title: "Healing Ward",
  key: "healing-ward-40126",
  baseName: "Steadfast Ward",
  description:
    "\"Call on your staff's strength to protect you or the lowest health ally around you with a damage shield that absorbs |cffffff8508|r damage.\\n\\nThe shield's strength is increased by up to |cffffff100|r%, depending on the severity of the target's wounds. \\n\\nWhile the shield persists, the target is healed for |cffffff34|r% of the shield's remaining strength every second.\"",
  icon: "/esoui/art/icons/ability_restorationstaff_001_a.dds",
  esoSkillId: 40126,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
