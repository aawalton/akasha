import type { TemperCompanionSkill } from "akasha/temper/catalog/temper-companions/temper-companion-skills/temper-companion-skill.page-type.types.ts"

export const azandarAzandarTheTriuneWord = {
  id: "019e6484-3841-7504-a5c3-3e506776506a",
  type: "temper-companion-skill",
  slug: "azandar-azandar-the-triune-word",
  key: "azandar-the-triune-word",
  title: "The Triune Word",
  icon: "/esoui/art/icons/ability_companion_arcanist_runeblades.dds",
  description:
    "Your Companion crafts a trio of runes before launching them at an enemy, dealing $1 Magic Damage three times.",
  companionId: "azandar",
  abilityId: 191273,
  skillLineId: "companion-azandar-scholar-of-apocrypha",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
