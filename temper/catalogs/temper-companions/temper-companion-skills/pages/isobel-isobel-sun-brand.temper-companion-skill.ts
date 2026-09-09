import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelSunBrand = {
  id: "019e6484-387a-7e0a-89b3-06a0f0ad268f",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-sun-brand",
  key: "isobel-sun-brand",
  title: "Sun Brand",
  icon: "/esoui/art/icons/ability_companion_templar_sun_fire.dds",
  description:
    "Your Companion hurls a blazing ball of fire at an enemy, dealing $1 Flame Damage on impact and an additional $2 Flame Damage over $$2 seconds.",
  companionId: "isobel",
  abilityId: 163452,
  skillLineId: "companion-isobel-blazing-might",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
