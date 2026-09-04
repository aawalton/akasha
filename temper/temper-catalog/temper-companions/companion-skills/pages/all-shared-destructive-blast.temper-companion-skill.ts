import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedDestructiveBlast = {
  id: "019e668d-c552-7c9f-9836-7e129d2978d5",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-destructive-blast",
  key: "shared-destructive-blast",
  title: "Destructive Blast",
  icon: "/esoui/art/icons/ability_companion_destructionstaff_005.dds",
  description:
    "Your Companion blasts an enemy with magic, dealing $1 Magic Damage. Flame Blast knocks them back 8 meters and stuns them for $$3 seconds. Frost Blast taunts them for $$4 seconds. Shock Blast deals an additional $2 Shock Damage to all other enemies around them.",
  companionId: "all",
  abilityId: 157131,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  validRoles: ["dps", "tank"],
  tags: ["elemental-variant"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
