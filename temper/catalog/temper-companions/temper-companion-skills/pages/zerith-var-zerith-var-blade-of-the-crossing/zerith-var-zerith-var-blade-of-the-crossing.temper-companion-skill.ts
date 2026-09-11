import type { TemperCompanionSkill } from "akasha/temper/catalog/temper-companions/temper-companion-skills/temper-companion-skill.page-type.types.ts"

export const zerithVarZerithVarBladeOfTheCrossing = {
  id: "019e6484-38ae-78e1-bcea-00334a19c551",
  type: "temper-companion-skill",
  slug: "zerith-var-zerith-var-blade-of-the-crossing",
  key: "zerith-var-blade-of-the-crossing",
  title: "Blade of the Crossing",
  icon: "/esoui/art/icons/ability_companion_zerith_mooncrescent.dds",
  description:
    "Your Companion calls upon the power of Azurah, swinging a blade of lunar light in front of them, dealing $1 Magic Damage. Enemies damaged by this ability have Minor Magickasteal applied for $$2 seconds, causing them and their allies to restore 168 Magicka to attackers every 1 second when damaging enemies.",
  companionId: "zerith-var",
  abilityId: 213169,
  skillLineId: "companion-zerith-var",
  skillType: "ultimate",
  validRoles: ["dps"],
  alternateAbilityIds: [213678],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
