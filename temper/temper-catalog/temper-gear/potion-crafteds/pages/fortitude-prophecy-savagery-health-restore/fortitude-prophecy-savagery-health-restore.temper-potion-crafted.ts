import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const fortitudeProphecySavageryHealthRestore = {
  id: "019e21f6-4066-7bd8-81d1-7b50e175d27f",
  pageTypeSlug: "temper-potion-crafted",
  slug: "fortitude-prophecy-savagery-health-restore",
  title: "Essence of Weapon Crit",
  key: "fortitude-prophecy-savagery-health-restore",
  description: "Grants Spell Critical, Restore Health, Increase Weapon Crit.",
  icon: "/esoui/art/icons/consumable_potion_012_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Crimson Nirnroot", "Dragonthorn", "Water Hyacinth"],
    },
    {
      names: ["Crimson Nirnroot", "Water Hyacinth", "Wormwood"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
