import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinInternalConflict = {
  id: "019e6484-38a6-7733-b11c-8f5fa210973b",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-internal-conflict",
  key: "tanlorin-internal-conflict",
  title: "Internal Conflict",
  icon: "/esoui/art/icons/ability_companion_tanlorin_internalconflict.dds",
  description:
    "Your Companion lays claim to an enemy's soul, dealing $1 Magic Damage to their target over $$1 seconds.",
  companionId: "tanlorin",
  abilityId: 214865,
  skillLineId: "companion-tanlorin-empathic-fighter",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
