import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const brutalityEnduranceSavageryStaminaRestore = {
  id: "019e21f6-4056-7458-a358-6888e3680c5a",
  pageTypeSlug: "temper-potion-crafted",
  slug: "brutality-endurance-savagery-stamina-restore",
  title: "Essence of Weapon Power",
  key: "brutality-endurance-savagery-stamina-restore",
  description: "Grants Restore Stamina, Increase Weapon Power, Increase Weapon Crit.",
  icon: "/esoui/art/icons/consumable_potion_005_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Blessed Thistle", "Dragonthorn", "Water Hyacinth"],
    },
    {
      names: ["Blessed Thistle", "Dragonthorn", "Wormwood"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
