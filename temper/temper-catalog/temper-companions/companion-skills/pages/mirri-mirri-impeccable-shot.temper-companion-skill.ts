import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriImpeccableShot = {
  id: "019e6484-3881-73a7-96c7-246fb67b1dde",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-impeccable-shot",
  key: "mirri-impeccable-shot",
  title: "Impeccable Shot",
  icon: "/esoui/art/icons/ability_companion_ultimate_mirri_001.dds",
  description:
    "Your Companion marks an enemy and exposes their weakness, causing them to take 20% more damage for $$2 seconds. While the enemy is exposed they build up to a single killing shot, unleashing a massive bolt that deals $1 Physical Damage.",
  companionId: "mirri",
  abilityId: 157259,
  skillLineId: "companion-mirri",
  skillType: "ultimate",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
