import type { TemperCompanionSkill } from "akasha/temper/catalog/temper-companions/temper-companion-skills/temper-companion-skill.page-type.types.ts"

export const azandarAzandarTendrilsOfTheColorlessSea = {
  id: "019e6484-383f-7f7c-a463-d5d57c121b6a",
  type: "temper-companion-skill",
  slug: "azandar-azandar-tendrils-of-the-colorless-sea",
  key: "azandar-tendrils-of-the-colorless-sea",
  title: "Tendrils of the Colorless Sea",
  icon: "/esoui/art/icons/ability_companion_arcanist_abyssalimpact.dds",
  description:
    "Your Companion infuses their arm with abyssal arcanum and thrusts forward, dealing $1 Physical Damage to enemies and applying Minor Vulnerability to them for $$2 seconds, increasing the damage they take by 5%.",
  companionId: "azandar",
  abilityId: 191293,
  skillLineId: "companion-azandar-scholar-of-apocrypha",
  skillType: "active",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
