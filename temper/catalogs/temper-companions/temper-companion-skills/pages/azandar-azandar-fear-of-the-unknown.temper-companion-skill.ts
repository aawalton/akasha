import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarFearOfTheUnknown = {
  id: "019e6484-383a-7134-9d92-171076d39e48",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-fear-of-the-unknown",
  key: "azandar-fear-of-the-unknown",
  title: "Fear of the Unknown",
  icon: "/esoui/art/icons/ability_companion_arcanist_runeofeldritchhorror.dds",
  description:
    "Your Companion confronts an enemy with the unknowable truth of reality, applying Fear to them for $$1 seconds.",
  companionId: "azandar",
  abilityId: 194266,
  skillLineId: "companion-azandar-quill-knight",
  skillType: "active",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
