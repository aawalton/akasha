import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedArcaneNova = {
  id: "019e668d-c551-7b24-b060-e470d31135a9",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-arcane-nova",
  key: "shared-arcane-nova",
  title: "Arcane Nova",
  icon: "/esoui/art/icons/ability_companion_destructionstaff_008.dds",
  description:
    "Your Companion releases a surge of magic to enemies around them, dealing $1 Magic Damage. Fire Nova applies the Burning status effect for $$2 seconds. Frost Nova applies the Chill status effect for $$3 seconds. Shock Nova applies the Concussion status effect for $$4 seconds.",
  companionId: "all",
  abilityId: 157230,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  validRoles: ["dps"],
  tags: ["elemental-variant"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
