import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const enduranceFortitudeSavageryHealthRestoreStaminaRestore = {
  id: "019e21f6-4064-7f1a-b15d-8c7656e32d5d",
  pageTypeSlug: "temper-potion-crafted",
  slug: "endurance-fortitude-savagery-health-restore-stamina-restore",
  title: "Essence of Weapon Crit",
  key: "endurance-fortitude-savagery-health-restore-stamina-restore",
  description: "Grants Restore Stamina, Restore Health, Increase Weapon Crit.",
  icon: "/esoui/art/icons/consumable_potion_012_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Columbine", "Dragonthorn", "Water Hyacinth"],
    },
    {
      names: ["Dragonthorn", "Mountain Flower", "Water Hyacinth"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
