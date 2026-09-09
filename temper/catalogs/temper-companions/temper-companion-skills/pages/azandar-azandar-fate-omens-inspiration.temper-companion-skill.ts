import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarFateOmensInspiration = {
  id: "019e6484-3838-7b6f-a908-a3e696d8a623",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-fate-omens-inspiration",
  key: "azandar-fate-omens-inspiration",
  title: "Fate Omen's Inspiration",
  icon: "/esoui/art/icons/ability_companion_arcanist_tomebearersinspiration.dds",
  description:
    "Your Companion charges their weapons and their allies' weapons with apocryphal energy for $$1 seconds, applying Minor Berserk, increasing their damage done by 5%.",
  companionId: "azandar",
  abilityId: 191765,
  skillLineId: "companion-azandar-scholar-of-apocrypha",
  skillType: "active",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
