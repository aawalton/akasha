import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianSearingWeapons = {
  id: "019e6484-3853-76d3-9ddd-c5d20b8300d2",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-searing-weapons",
  key: "bastian-searing-weapons",
  title: "Searing Weapons",
  icon: "/esoui/art/icons/ability_companion_dragonknight_015.dds",
  description:
    "Your Companion charges their weapons and their allies' weapons with volcanic power, increasing their damage done with Light and Heavy Attacks by 15% for $$1 seconds.",
  companionId: "bastian",
  abilityId: 155355,
  skillLineId: "companion-bastian-radiating-heart",
  skillType: "active",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
