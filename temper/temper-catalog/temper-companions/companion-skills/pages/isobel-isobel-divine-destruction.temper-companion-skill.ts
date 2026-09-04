import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelDivineDestruction = {
  id: "019e6484-3871-7070-bb6d-98c87f3d6e85",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-divine-destruction",
  key: "isobel-divine-destruction",
  title: "Divine Destruction",
  icon: "/esoui/art/icons/ability_companion_templar_over_exposure.dds",
  description:
    "Your Companion unleashes a concentrated beam of divine energy at an enemy, dealing $1 Magic Damage over $$1 seconds.",
  companionId: "isobel",
  abilityId: 163564,
  skillLineId: "companion-isobel-blazing-might",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
